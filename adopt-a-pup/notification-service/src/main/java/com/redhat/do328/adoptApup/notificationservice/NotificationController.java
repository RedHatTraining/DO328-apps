package com.redhat.do328.adoptApup.notificationservice;

import com.redhat.do328.adoptApup.notificationservice.models.EmailNotificationRequest;
import com.redhat.do328.adoptApup.notificationservice.models.NotificationStatusResponse;
import com.redhat.do328.adoptApup.notificationservice.services.EmailManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private EmailManagerService emailManagerService;

    @RequestMapping(method = RequestMethod.POST, value = "/sendEmails")
    public void registerAnimalNotification(@RequestBody EmailNotificationRequest emailNotificationRequest) {
        emailManagerService.sendEmails(emailNotificationRequest);
    }
}
