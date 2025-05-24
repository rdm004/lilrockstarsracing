package com.lilrockstars.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class LilrockstarsApplication {
    public static void main(String[] args) {
        SpringApplication.run(LilrockstarsApplication.class, args);
    }

    @Bean
    public CommandLineRunner pwGenerator(PasswordEncoder encoder) {
        return args -> {
            // replace "adminSecret" with whatever plain-text password you want
//            String hash = encoder.encode("adminSecret");
//            System.out.println("=== bcrypt(\"adminSecret\") = " + hash);
        };
    }
}