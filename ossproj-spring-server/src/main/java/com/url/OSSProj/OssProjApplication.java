package com.url.OSSProj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OssProjApplication {

	public static void main(String[] args) {
		SpringApplication.run(OssProjApplication.class, args);
	}

}
