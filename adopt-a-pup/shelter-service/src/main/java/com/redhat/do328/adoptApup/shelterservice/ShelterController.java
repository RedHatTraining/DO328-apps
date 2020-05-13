package com.redhat.do328.adoptApup.shelterservice;

import com.redhat.do328.adoptApup.shelterservice.model.Shelter;
import com.redhat.do328.adoptApup.shelterservice.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shelter")
public class ShelterController {

    @Autowired
    private ShelterService shelterService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String enrollShelter(@RequestBody Shelter shelter) {
        return shelterService.enrollShelter(shelter);
    }


    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public List<Shelter> getAllShelters() {
        return shelterService.getAllShelters();
    }

    @RequestMapping(value = "/{shelter-id}/getShelter", method = RequestMethod.GET)
    public Shelter getShelterById(@PathVariable(value = "shelter-id") String shelterId) {
        return shelterService.getShelterById(shelterId);
    }
}
