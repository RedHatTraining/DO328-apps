package com.redhat.do328.adoptApup.adoptionservice.service;

import com.redhat.do328.adoptApup.adoptionservice.model.Animal;
import com.redhat.do328.adoptApup.adoptionservice.model.Shelter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdoptionService {

    @Value("${animalService.host}")
    private String animalServiceHost;

    @Value("${shelterService.host}")
    private String shelterServiceHost;

    @Autowired
    private RestTemplate restTemplate;

    public Map<Shelter, List<Animal>> getAdoptableAnimals() throws URISyntaxException {
        final ResponseEntity<Animal[]> animalResponse = restTemplate.getForEntity(new URI(animalServiceHost + "/animals/getAllAdoptable"), Animal[].class);
        final ResponseEntity<Shelter[]> shelterResponse = restTemplate.getForEntity(new URI(shelterServiceHost + "/shelters/getAll"), Shelter[].class);

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
}
