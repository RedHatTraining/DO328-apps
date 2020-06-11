package com.redhat.do328.adoptApup.adoptionservice.service;

import com.google.common.base.Joiner;
import com.redhat.do328.adoptApup.adoptionservice.model.AdoptionApplication;
import com.redhat.do328.adoptApup.adoptionservice.model.AdoptionApplicationResponse;
import com.redhat.do328.adoptApup.adoptionservice.model.Animal;
import com.redhat.do328.adoptApup.adoptionservice.model.AnimalStatusChangeRequest;
import com.redhat.do328.adoptApup.adoptionservice.model.Email;
import com.redhat.do328.adoptApup.adoptionservice.model.EmailNotificationRequest;
import com.redhat.do328.adoptApup.adoptionservice.model.Residency;
import com.redhat.do328.adoptApup.adoptionservice.model.Shelter;
import com.redhat.do328.adoptApup.adoptionservice.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.stringtemplate.v4.ST;
import org.stringtemplate.v4.STRawGroupDir;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdoptionService {
    private static final STRawGroupDir templateFile = new STRawGroupDir("templates");
    private static final String APPROVAL_SUBJECT = "CONGRATULATIONS! Your application has been approved";

    @Value("${animalService.host}")
    private String animalServiceHost;

    @Value("${shelterService.host}")
    private String shelterServiceHost;

    @Value("${notificationService.host}")
    private String notificationServiceHost;

    @Autowired
    private RestTemplate restTemplate;

    public Map<Shelter, List<Animal>> getAdoptableAnimals()  {
        final ResponseEntity<Animal[]> animalResponse = restTemplate.getForEntity(animalServiceHost + "/animals/getAllAdoptable", Animal[].class);
        final ResponseEntity<Shelter[]> shelterResponse = restTemplate.getForEntity(shelterServiceHost + "/shelters/getAll", Shelter[].class);

        if (!animalResponse.getStatusCode().is2xxSuccessful() || !shelterResponse.getStatusCode().is2xxSuccessful()
                || animalResponse.getBody() == null || shelterResponse.getBody() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong, please try again later.");
        }

        final List<Animal> animals = Arrays.asList(animalResponse.getBody());
        final List<Shelter> shelters = Arrays.asList(shelterResponse.getBody());


        return shelters.stream().collect(Collectors.toMap(shelter -> shelter,
                shelter -> animals.stream().filter(animal -> animal.getShelterId().equals(shelter.getShelterId()))
        .collect(Collectors.toList())));
    }

    public AdoptionApplicationResponse applyForAdoption(AdoptionApplication application) {
        final ResponseEntity<Animal> animalResponse = restTemplate.getForEntity(animalServiceHost + "/animals/" + application.getAnimalId() + "/getAnimalById", Animal.class);
        // TODO this needs to be fixed for concurrency issues.. what if it's adoptable at the time of request but immediately after someone else tries?
        if (!animalResponse.getStatusCode().is2xxSuccessful() || animalResponse.getBody() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This animal was not found.");
        } else if (!animalResponse.getBody().isAdoptable()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This animal is no longer available for adoption");
        }
        final Animal animal = animalResponse.getBody();
        final List<String> denialReasons = new ArrayList<>();
        if (animal.getResidencyRequired().equals(Residency.HOUSE) && application.getResidency().equals(Residency.APARTMENT)) {
            denialReasons.add("Requires house");
        }
        if (animal.getSquareFootageOfHome() > application.getSquareFootageOfHome()) {
            denialReasons.add("Requires minimum of " + animal.getSquareFootageOfHome() + " square feet");
        }
        if (!animal.isChildSafe() && application.isKidsUnder16()) {
            denialReasons.add("Requires no children due to aggression issues");
        }
        if (StringUtils.isEmpty(application.getOccupation())) {
            denialReasons.add("Dogs are expensive get a job");
        }
        if (!animal.isOtherDogSafe() && application.isOwnOtherAnimals()) {
            denialReasons.add("Does not do well with other animals");
        }
        final AdoptionApplicationResponse adoptionApplicationResponse = new AdoptionApplicationResponse();
        if (!denialReasons.isEmpty()) {
            final String message = Joiner.on(", ").join(denialReasons);
            adoptionApplicationResponse.setMessage("This application has been denied for the following reason(s): " + message);
            adoptionApplicationResponse.setStatus(Status.DENIED);
        } else {
            final ResponseEntity responseEntityResponseEntity = restTemplate.postForEntity(animalServiceHost + "/animals/" + application.getAnimalId() + "/setAdoptionStatus",
                    new AnimalStatusChangeRequest(false), ResponseEntity.class);
            if (!responseEntityResponseEntity.getStatusCode().is2xxSuccessful()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong with this application, please try again later");
            }
            // TODO send notification to user.. do this in parallel behind the scenes
            final ResponseEntity<Shelter> shelterResponse = restTemplate.getForEntity(shelterServiceHost + "/shelters/" + animal.getShelterId() + "/getShelter", Shelter.class);
            if (!shelterResponse.getStatusCode().is2xxSuccessful() || null == shelterResponse.getBody()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Shelter not found");
            }
            final Shelter shelter = shelterResponse.getBody();
            final String shelterEmail = shelter.getEmail();
            // TODO send email to shelter
            final String renderedTemplate = renderTemplate(application.getUsername(), animal.getAnimalName(), shelter.getShelterName(), shelterEmail, shelter.getPhoneNumber());
            final EmailNotificationRequest emailNotificationRequest = new EmailNotificationRequest(Collections.singletonMap(application.getEmail(), new Email(renderedTemplate, APPROVAL_SUBJECT)));

            restTemplate.postForEntity(notificationServiceHost + "/notifications/sendEmails", emailNotificationRequest, ResponseEntity.class );
            adoptionApplicationResponse.setStatus(Status.APPROVED);
            adoptionApplicationResponse.setMessage("Congratulations, your application to adopt " + animal.getAnimalName() + " has been approved! You should be receiving an email soon with further instructions");
        }
        return adoptionApplicationResponse;
    }

    private String renderTemplate(final String username, final String animalName, final String shelterName, final String shelterEmail, final String shelterPhone) {
        final ST template = templateFile.getInstanceOf("applicationApproval");
        template.add("username", username);
        template.add("animalName", animalName);
        template.add("shelterName", shelterName);
        template.add("shelterEmail", shelterEmail);
        template.add("shelterPhone", shelterPhone);
        return template.render();
    }
}
