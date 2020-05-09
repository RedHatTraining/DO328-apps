package com.redhat.do328.adoptApup.animalservice.dao;

import com.redhat.do328.adoptApup.animalservice.model.Animal;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AnimalRepository extends PagingAndSortingRepository<Animal, String> {
    List<Animal> findAll();
}
