package com.redhat.do328.adoptApup.notificationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchNotification {
    private String username;
    private String email;
    private String breed;
    private String weight;
}
