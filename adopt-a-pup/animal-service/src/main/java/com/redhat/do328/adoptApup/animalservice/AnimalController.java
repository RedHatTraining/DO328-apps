package com.redhat.do328.adoptApup.animalservice;

import com.redhat.do328.adoptApup.animalservice.model.Animal;
import com.redhat.do328.adoptApup.animalservice.model.AnimalNotificationRequestCriteria;
import com.redhat.do328.adoptApup.animalservice.model.AnimalStatusChangeRequest;
import com.redhat.do328.adoptApup.animalservice.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/animals")
public class AnimalController {


    @Autowired
    private AnimalService animalService;

    @RequestMapping(method = RequestMethod.POST, value = "/{shelter-id}/create")
    public String createAnimal(@RequestBody Animal animal,
                               @PathVariable(value = "shelter-id") String shelterId) {
        animal.setShelterId(shelterId);
        return animalService.createAnimal(animal);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{animal-id}/setAdoptionStatus")
    public void setAdoptionStatus(@RequestBody AnimalStatusChangeRequest adoptionStatus,
                                  @PathVariable("animal-id") String animalId) {
        animalService.setAdoptionStatus(adoptionStatus, animalId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getAllAdoptable")
    public List<Animal> getAllAdoptableAnimals() {
        return animalService.getAllAdoptableAnimals();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{animal-id}/getAnimalById")
    public Animal getAnimalById(@PathVariable(value = "animal-id") String animalId) {
        return animalService.findAnimalById(animalId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/subscribe")
    public void createNotificationSubscription(@RequestBody AnimalNotificationRequestCriteria criteria) {
        animalService.createNotificationSubscription(criteria);
    }
}
