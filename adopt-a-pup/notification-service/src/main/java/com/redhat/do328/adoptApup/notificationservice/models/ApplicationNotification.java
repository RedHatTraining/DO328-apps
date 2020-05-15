package com.redhat.do328.adoptApup.notificationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicationNotification {
    private String username;
    private String email;
    private UUID animalId;

}
