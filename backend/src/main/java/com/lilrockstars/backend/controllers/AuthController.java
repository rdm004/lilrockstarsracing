package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.LoginDTO;
import com.lilrockstars.backend.dto.RegisterDTO;
import com.lilrockstars.backend.entities.Parent;
import com.lilrockstars.backend.entities.Person;
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
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    @Autowired
    public AuthController(PersonRepository personRepo,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManager authManager) {
        this.personRepo = personRepo;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
    }

    @PostMapping("/register")
    public ResponseEntity<Person> register(@Valid @RequestBody RegisterDTO dto) {
        if (personRepo.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Parent p = new Parent();
        p.setFirstName(dto.getFirstName());
        p.setLastName(dto.getLastName());
        p.setEmail(dto.getEmail());
        p.setPassword(passwordEncoder.encode(dto.getPassword()));
        Person saved = personRepo.save(p);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginDTO dto) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        return ResponseEntity.ok().build();
    }
}