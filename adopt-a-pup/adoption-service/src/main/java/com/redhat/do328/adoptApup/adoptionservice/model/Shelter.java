package com.redhat.do328.adoptApup.adoptionservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Shelter {
    private String shelterId;
    private String shelterName;
    private String state;
    private String country;
    private String address;
    private String email;
    private String phoneNumber;
}
