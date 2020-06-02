package com.redhat.do328.adoptApup.animalservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Email {
    private String message;
    private String subject;
}
