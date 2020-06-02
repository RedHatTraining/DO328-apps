package com.redhat.do328.adoptApup.shelterservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableSwagger2
public class ShelterServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShelterServiceApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
