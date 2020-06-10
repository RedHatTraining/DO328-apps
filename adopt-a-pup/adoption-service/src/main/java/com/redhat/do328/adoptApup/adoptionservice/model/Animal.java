package com.redhat.do328.adoptApup.adoptionservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Animal {
    private String animalId;
    private String animalName;
    private String shelterId;
    private String breed;
    private int weight;
    private AnimalSize approximateSize;
    private boolean adoptable;
    private Residency residencyRequired;
    private int squareFootageOfHome;
    private boolean childSafe;
    private boolean otherDogSafe;
    private String photoUrl;
}
