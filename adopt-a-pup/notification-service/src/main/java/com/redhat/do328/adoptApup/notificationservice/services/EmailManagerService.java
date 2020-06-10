package com.redhat.do328.adoptApup.notificationservice.services;

import com.redhat.do328.adoptApup.notificationservice.models.Email;
import com.redhat.do328.adoptApup.notificationservice.models.EmailNotificationRequest;
import com.redhat.do328.adoptApup.notificationservice.models.NotificationStatusResponse;
import com.redhat.do328.adoptApup.notificationservice.models.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmailManagerService {

    @Autowired
    private JavaMailSender emailSender;

    public NotificationStatusResponse sendEmails(EmailNotificationRequest emailNotificationRequest) {
        try {
            emailNotificationRequest.getMessagesByEmail().keySet().forEach(email -> {
                final Email emailDetails = emailNotificationRequest.getMessagesByEmail().get(email);
                final SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject(emailDetails.getSubject());
                message.setText(emailDetails.getMessage());
                message.setFrom("noreply@adoptapup.com");
                emailSender.send(message);
            });
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred sending email notification(s)");
        }
        return new NotificationStatusResponse(Status.SUCCESS);
    }
}
