package com.redhat.do328.adoptApup.adoptionservice;

import com.redhat.do328.adoptApup.adoptionservice.model.AdoptionApplication;
import com.redhat.do328.adoptApup.adoptionservice.model.AdoptionApplicationResponse;
import com.redhat.do328.adoptApup.adoptionservice.model.Animal;
import com.redhat.do328.adoptApup.adoptionservice.model.Shelter;
import com.redhat.do328.adoptApup.adoptionservice.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adoption")
public class AdoptionController {

    @Autowired
    private AdoptionService adoptionService;

    @RequestMapping(method = RequestMethod.GET, value = "/getAllAdoptableByShelter")
    public Map<Shelter, List<Animal>> getAllAdoptableAnimalsByShelter() {
        return adoptionService.getAdoptableAnimals();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/applyForAdoption")
    public AdoptionApplicationResponse applyForAdoption(@RequestBody AdoptionApplication application) {
        return adoptionService.applyForAdoption(application);
    }
}
