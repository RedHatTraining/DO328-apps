package com.redhat.do328.adoptApup.userservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> createUser() {
        return ResponseEntity.of(Optional.of("hello"));
    }
}
