package com.redhat.do328.adoptApup.animalservice;

import com.redhat.do328.adoptApup.animalservice.model.Animal;
import com.redhat.do328.adoptApup.animalservice.model.AnimalNotificationRequestCriteria;
import com.redhat.do328.adoptApup.animalservice.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/animals")
public class AnimalController {


    @Autowired
    private AnimalService animalService;

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public String createAnimal(@RequestBody Animal animal) throws URISyntaxException {
        return animalService.createAnimal(animal);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/createBulk")
    public List<String> createAnimalBulk(@RequestBody List<Animal> animals) throws Exception {
        return animalService.createAnimalsBulk(animals);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{animal-id}")
    public Animal getAnimalById(@PathVariable(value = "animal-id") String animalId) {
        return animalService.findAnimalById(animalId);
    }

    public void createNotificationSubscription(@RequestBody AnimalNotificationRequestCriteria criteria) {

    }
}
