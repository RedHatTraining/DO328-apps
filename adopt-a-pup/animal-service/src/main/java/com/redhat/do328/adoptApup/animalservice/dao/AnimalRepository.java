package com.redhat.do328.adoptApup.animalservice.dao;

import com.redhat.do328.adoptApup.animalservice.model.Animal;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface AnimalRepository extends PagingAndSortingRepository<Animal, String> {
    List<Animal> findAll();
    List<Animal> findAllByAdoptable(boolean isAdoptable);
}
