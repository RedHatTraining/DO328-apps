package com.redhat.do328.adoptApup.animalservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "animals")
public class Animal {
    @JsonIgnore
    @Id
    private String animalId;
    private String animalName;
    @JsonIgnore
    private String shelterId;
    private String breed;
    private int weight;
    private AnimalSize approximateSize;
    private boolean adoptable;
    private Residency residencyRequired;
    private int squareFootageOfHome;
    private boolean childSafe;
    private boolean otherDogSafe;
}
