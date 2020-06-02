package com.redhat.do328.adoptApup.animalservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnimalNotificationRequestCriteria {
    private String username;
    private String email;
    private String breed;
    private int minWeight;
    private int maxWeight;
    private AnimalSize approximateSize;
}
