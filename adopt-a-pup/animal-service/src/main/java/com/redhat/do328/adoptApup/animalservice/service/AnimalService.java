package com.redhat.do328.adoptApup.animalservice.service;

import com.redhat.do328.adoptApup.animalservice.dao.AnimalNotificationSubscriptionRepository;
import com.redhat.do328.adoptApup.animalservice.dao.AnimalRepository;
import com.redhat.do328.adoptApup.animalservice.model.Animal;
import com.redhat.do328.adoptApup.animalservice.model.AnimalNotificationRequestCriteria;
import com.redhat.do328.adoptApup.animalservice.model.AnimalStatusChangeRequest;
import com.redhat.do328.adoptApup.animalservice.model.Email;
import com.redhat.do328.adoptApup.animalservice.model.EmailNotificationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.stringtemplate.v4.ST;
import org.stringtemplate.v4.STRawGroupDir;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnimalService {
    private static final STRawGroupDir templateFile = new STRawGroupDir("templates");
    public static final String NOTIFICATION_REQUEST_SUBJECT = "ALERT - Animal Availability Notification";

    @Value("${notificationService.host}")
    private String notificationServiceUrl;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalNotificationSubscriptionRepository animalNotificationSubscriptionRepository;

    @Autowired
    private RestTemplate restTemplate;

    public String createAnimal(Animal animal) {
        final String animalID = UUID.randomUUID().toString();
        animal.setAnimalId(animalID);
        animalRepository.save(animal);
        final List<AnimalNotificationRequestCriteria> animalCriteria = animalNotificationSubscriptionRepository.findAll();

        final List<AnimalNotificationRequestCriteria> matchingNotificationCriteria = animalCriteria.stream().map(animalNotificationRequestCriteria -> {
            if ((animalNotificationRequestCriteria.getBreed() != null && !animal.getBreed().equals(animalNotificationRequestCriteria.getBreed()))
                    || animal.getWeight() < animalNotificationRequestCriteria.getMinWeight()
                    || animal.getWeight() > animalNotificationRequestCriteria.getMaxWeight()
                    || animalNotificationRequestCriteria.getApproximateSize() != null && animalNotificationRequestCriteria.getApproximateSize().equals(animal.getApproximateSize())) {
                return null;
            }
            return animalNotificationRequestCriteria;
        }).filter(Objects::nonNull)
                .collect(Collectors.toList());
        if (!CollectionUtils.isEmpty(matchingNotificationCriteria)) {
            final Map<String, Email> templatesToEmail = matchingNotificationCriteria.stream()
                    .collect(Collectors.toMap(AnimalNotificationRequestCriteria::getEmail, criteria -> new Email(renderTemplate(criteria, animal), NOTIFICATION_REQUEST_SUBJECT)));
            final ResponseEntity response = restTemplate.postForEntity(notificationServiceUrl + "/notifications/sendEmails", templatesToEmail, ResponseEntity.class);
            if (HttpStatus.OK.equals(response.getStatusCode())) {
                animalNotificationSubscriptionRepository.deleteAll(matchingNotificationCriteria);
            }

        }

        return animalID;
    }

    public Animal findAnimalById(String animalId) {
        final Optional<Animal> animal = animalRepository.findById(animalId);
        if (!animal.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "animal not found for animal ID " + animalId);
        }
        return animal.get();
    }

    public void createNotificationSubscription(AnimalNotificationRequestCriteria criteria) {
        animalNotificationSubscriptionRepository.save(criteria);

        List<Animal> animals = animalRepository.findAll();
        final List<Animal> matchingAnimals = matchCriteria(criteria, animals);
        final Map<String, Email> notificationRequest = new HashMap<>();
        matchingAnimals.forEach(animal -> {
            final String renderedTemplate = renderTemplate(criteria, animal);
            final Email email = new Email(renderedTemplate, NOTIFICATION_REQUEST_SUBJECT);
            notificationRequest.put(criteria.getEmail(), email);
        });
        final ResponseEntity response = restTemplate.postForEntity(notificationServiceUrl + "/notifications/sendEmails", new EmailNotificationRequest(notificationRequest), ResponseEntity.class);
        if (HttpStatus.OK.equals(response.getStatusCode())) {
            animalNotificationSubscriptionRepository.delete(criteria);
        }
    }

    private String renderTemplate(AnimalNotificationRequestCriteria criteria, Animal animal) {
        final ST template = templateFile.getInstanceOf("animalNotificationRequest");
        template.add("username", criteria.getUsername());
        template.add("breed", criteria.getBreed());
        template.add("minWeight", criteria.getMinWeight());
        template.add("maxWeight", criteria.getMaxWeight() > 0 ? criteria.getMaxWeight() : "N/A");
        template.add("approximateSize", criteria.getApproximateSize() == null ? "N/A": criteria.getApproximateSize());
        template.add("animalName", animal.getAnimalName());
        template.add("websiteUrl", "https://google.com");
        template.add("animalId", animal.getAnimalId());
        return template.render();
    }

    private List<Animal> matchCriteria(AnimalNotificationRequestCriteria criteria, List<Animal> animals) {
        return animals.stream().map(animal -> {
            if ((criteria.getBreed() != null && !animal.getBreed().equals(criteria.getBreed()))
                    || animal.getWeight() < criteria.getMinWeight()
                    || animal.getWeight() > criteria.getMaxWeight()
                    || criteria.getApproximateSize() != null && !criteria.getApproximateSize().equals(animal.getApproximateSize())) {
                return null;
            }
            return animal;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }

    public List<Animal> getAllAdoptableAnimals() {
        return animalRepository.findAllByAdoptable(true);
    }

    public void setAdoptionStatus(AnimalStatusChangeRequest adoptionStatus, String animalId) {
        final Optional<Animal> animalById = animalRepository.findById(animalId);
        if (!animalById.isPresent()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Update status operation failed, please try again later");
        }
        final Animal animal = animalById.get();
        animal.setAdoptable(adoptionStatus.isNewAdoptableStatus());
        animalRepository.save(animal);
    }
}
