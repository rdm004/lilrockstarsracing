package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            System.out.println("🔐 Attempt login for: " + email);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            System.out.println("✅ Authenticated! Issuing token.");

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "email", userDetails.getUsername()
            ));

        } catch (BadCredentialsException ex) {
            System.out.println("❌ Bad credentials for: " + email);
            return ResponseEntity.status(403).body(Map.of("error", "Invalid credentials"));
        } catch (Exception ex) {
            System.out.println("❌ Internal error during login for: " + email);
            ex.printStackTrace(); // ← this is what you need to check logs for!
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }
}