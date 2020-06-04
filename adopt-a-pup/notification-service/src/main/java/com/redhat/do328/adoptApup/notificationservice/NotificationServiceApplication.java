package com.redhat.do328.adoptApup.notificationservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Properties;

@SpringBootApplication(scanBasePackages = "com.redhat.do328.adoptApup.notificationservice")
@EnableSwagger2
public class NotificationServiceApplication {

//	@Value("${spring.mail.username}")
//	private String smtpUsername;
//
//	@Value("${spring.mail.password}")
//	private String smtpPassword;

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

//		mailSender.setUsername(smtpUsername);
//		mailSender.setPassword(smtpPassword);

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.transport.protocol", "smtp");
//		props.put("mail.smtp.auth", "true");
//		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.debug", "true");

		return mailSender;
	}
}
