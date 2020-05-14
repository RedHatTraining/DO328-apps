package com.redhat.do328.adoptApup.adoptionservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdoptionApplication {
    private String username;
    private String animalId;
    private Residency residency;
    private int squareFootageOfHome;
    private boolean kidsUnder16;
    private String occupation;
    private boolean ownOtherAnimals;
    private String email;
}
