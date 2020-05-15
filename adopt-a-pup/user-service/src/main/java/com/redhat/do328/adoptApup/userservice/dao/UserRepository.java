package com.redhat.do328.adoptApup.userservice.dao;

import com.redhat.do328.adoptApup.userservice.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, String> {
    User findByUsername(String username);
}
