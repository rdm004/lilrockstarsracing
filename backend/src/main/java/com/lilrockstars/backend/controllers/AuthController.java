package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.LoginDTO;
import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private PersonRepository personRepo;
    @Autowired private AuthenticationManager authManager;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(),
                userDetails.getAuthorities().stream().map(a -> a.getAuthority()).toList()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody com.lilrockstars.backend.dto.UserRegisterDTO dto) {
        if (personRepo.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("User already exists");
        }
        Person person = new Person();
        person.setFirstName(dto.getFirstName());
        person.setLastName(dto.getLastName());
        person.setEmail(dto.getEmail());
        person.setPassword(passwordEncoder.encode(dto.getPassword()));
        person.setRole(Role.PARENT); // Ensure role is passed or default to PARENT
        personRepo.save(person);
        return ResponseEntity.ok("User registered");
    }

    // JWT response DTO
    private static class JwtResponse {
        private String token;
        private String username;
        private List<String> roles;

        public JwtResponse(String token, String username, List<String> roles) {
            this.token = token;
            this.username = username;
            this.roles = roles;
        }

        public String getToken() { return token; }
        public String getUsername() { return username; }
        public List<String> getRoles() { return roles; }
    }
    @Controller
    public class HomeController {
        @GetMapping("/")
        public String index() {
            return "redirect:index.html";
        }
    }
}