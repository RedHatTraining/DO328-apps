package com.redhat.do328.adoptApup.animalservice.dao;

import com.redhat.do328.adoptApup.animalservice.model.Animal;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


public interface AnimalRepository extends PagingAndSortingRepository<Animal, String> {

}
