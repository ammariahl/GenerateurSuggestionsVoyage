package com.whereto.destination;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.whereto.destination")
@EntityScan(basePackages = "com.whereto.destination.entity")
@EnableJpaRepositories(basePackages = "com.whereto.destination.repository")
public class DestinationApplication {

	public static void main(String[] args) {
		SpringApplication.run(DestinationApplication.class, args);
	}
}
