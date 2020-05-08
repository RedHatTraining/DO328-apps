package com.redhat.do328.adoptApup.animalservice.dao;

import com.redhat.do328.adoptApup.animalservice.model.AnimalNotificationRequestCriteria;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface AnimalNotificationSubscriptionRepository extends PagingAndSortingRepository<AnimalNotificationRequestCriteria, String> {
    List<AnimalNotificationRequestCriteria> findAll();
}
