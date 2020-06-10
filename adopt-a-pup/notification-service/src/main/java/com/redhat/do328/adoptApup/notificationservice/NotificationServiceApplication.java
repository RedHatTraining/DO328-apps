package com.redhat.do328.adoptApup.notificationservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(scanBasePackages = "com.redhat.do328.adoptApup.notificationservice")
@EnableSwagger2
public class NotificationServiceApplication {

	@Value("${spring.mail.port}")
	private int smtpPort;

	@Value("${spring.mail.host}")
	private String smptHost;

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

	@Bean
	@Primary
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost(smptHost);
		mailSender.setPort(smtpPort);
		return mailSender;
	}
}
