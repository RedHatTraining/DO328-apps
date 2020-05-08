package com.redhat.do328.adoptApup.shelterservice.dao;

import com.redhat.do328.adoptApup.shelterservice.model.Shelter;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ShelterDao extends PagingAndSortingRepository<Shelter, String> {
    List<Shelter> findAll();
}
