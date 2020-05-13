package com.redhat.do328.adoptApup.adoptionservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnimalList {
    private List<Animal> animals;
}
