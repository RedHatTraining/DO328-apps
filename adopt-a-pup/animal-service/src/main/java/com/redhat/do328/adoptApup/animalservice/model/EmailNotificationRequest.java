package com.redhat.do328.adoptApup.animalservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailNotificationRequest {
    private Map<String, Email> messagesByEmail;
}
