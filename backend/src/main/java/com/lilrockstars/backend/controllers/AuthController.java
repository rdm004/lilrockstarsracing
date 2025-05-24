package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.LoginDTO;
import com.lilrockstars.backend.dto.UserRegisterDTO;
import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final PersonRepository personRepo;
//    private final AuthenticationManager authManager;
//    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(
            PersonRepository personRepo,
//            AuthenticationManager authManager,
//            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.personRepo = personRepo;
//        this.authManager = authManager;
//        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
//        Authentication auth = authManager.authenticate(
//                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
//        );
//        SecurityContextHolder.getContext().setAuthentication(auth);
//        UserDetails userDetails = (UserDetails) auth.getPrincipal();
//        String jwt = jwtUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(),
//                userDetails.getAuthorities().stream().map(a -> a.getAuthority()).toList()));
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDTO dto) {
//        if (personRepo.findByEmail(dto.getEmail()).isPresent()) {
//            return ResponseEntity.status(409).body("User already exists");
//        }
//        Person person = new Person();
//        person.setFirstName(dto.getFirstName());
//        person.setLastName(dto.getLastName());
//        person.setEmail(dto.getEmail());
//        person.setPassword(passwordEncoder.encode(dto.getPassword()));
//        person.setRole(Role.PARENT);
//        personRepo.save(person);
//        return ResponseEntity.ok("User registered");
//    }

    // Inner class for JWT response
    private static class JwtResponse {
        private final String token;
        private final String username;
        private final List<String> roles;

        public JwtResponse(String token, String username, List<String> roles) {
            this.token = token;
            this.username = username;
            this.roles = roles;
        }

        public String getToken() { return token; }
        public String getUsername() { return username; }
        public List<String> getRoles() { return roles; }
    }
}