package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.LoginDTO;
import com.lilrockstars.backend.dto.UserRegisterDTO;
import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.PersonRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final PersonRepository personRepo;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(PersonRepository personRepo,
                          AuthenticationManager authManager,
                          PasswordEncoder passwordEncoder) {
        this.personRepo = personRepo;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegisterDTO dto) {
        if (personRepo.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("That email is already registered.");
        }

        Person p = new Person();
        p.setFirstName(dto.getFirstName());
        p.setLastName(dto.getLastName());
        p.setEmail(dto.getEmail());
        p.setPassword(passwordEncoder.encode(dto.getPassword()));
        p.setRole(Role.PARENT);
        personRepo.save(p);

        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO dto) {
        var token = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        authManager.authenticate(token);
        return ResponseEntity.ok("Login successful");
    }
}