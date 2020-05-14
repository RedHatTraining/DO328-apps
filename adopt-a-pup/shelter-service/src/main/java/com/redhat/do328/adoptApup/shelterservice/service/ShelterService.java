package com.redhat.do328.adoptApup.shelterservice.service;

import com.redhat.do328.adoptApup.shelterservice.dao.ShelterDao;
import com.redhat.do328.adoptApup.shelterservice.model.Shelter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShelterService {

    @Autowired
    private ShelterDao shelterDao;

    public String enrollShelter(Shelter shelter) {
        final String shelterId = UUID.randomUUID().toString();
        shelter.setShelterId(shelterId);
        shelterDao.save(shelter);
        return shelterId;
    }

    public List<Shelter> getAllShelters() {
        return shelterDao.findAll();
    }

    public Shelter getShelterById(String shelterId) {
        final Optional<Shelter> shelter = shelterDao.findById(shelterId);
        if (!shelter.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "shelter ID " + shelterId + " not found.");
        }
        return shelter.get();
    }
}
