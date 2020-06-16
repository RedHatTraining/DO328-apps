package com.redhat.do328.adoptApup.animalservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(scanBasePackages = "com.redhat.do328.adoptApup.animalservice")
@EnableSwagger2
public class AnimalServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimalServiceApplication.class, args);
	}



	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
