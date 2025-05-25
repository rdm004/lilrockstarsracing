package com.lilrockstars.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class LilrockstarsApplication {
    public static void main(String[] args) {
        // Load variables from .env file
        Dotenv dotenv = Dotenv.configure()
                .directory("./")  // directory where .env is located
                .filename(".env") // name of the env file
                .load();

        // Inject into system properties so Spring can use them
        System.setProperty("SPRING_DATASOURCE_URL", dotenv.get("SPRING_DATASOURCE_URL"));
        System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
        System.setProperty("SPRING_DATASOURCE_PASSWORD", dotenv.get("SPRING_DATASOURCE_PASSWORD"));

        // Debug print
        System.out.println("SPRING_DATASOURCE_URL = " + dotenv.get("SPRING_DATASOURCE_URL"));
        System.out.println("SPRING_DATASOURCE_USERNAME = " + dotenv.get("SPRING_DATASOURCE_USERNAME"));
        System.out.println("SPRING_DATASOURCE_PASSWORD = " + dotenv.get("SPRING_DATASOURCE_PASSWORD"));

        SpringApplication.run(LilrockstarsApplication.class, args);
    }

    @Bean
    public CommandLineRunner pwGenerator(PasswordEncoder encoder) {
        return args -> {
            // For optional password hashing
            // String hash = encoder.encode("adminSecret");
            // System.out.println("bcrypt(\"adminSecret\") = " + hash);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}