package com.redhat.do328.adoptApup.shelterservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "shelters")
public class Shelter {

    @Id
    private String shelterId;
    private String shelterName;
    private String state;
    private String country;
    private String address;
    private String email;
    private String phoneNumber;
}
