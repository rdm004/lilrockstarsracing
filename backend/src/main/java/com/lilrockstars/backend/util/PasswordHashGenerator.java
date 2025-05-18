package com.lilrockstars.backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: java PasswordHashGenerator <plain-text-password>");
            System.exit(1);
        }
        var enc = new BCryptPasswordEncoder();
        System.out.println(enc.encode(args[0]));
    }
}