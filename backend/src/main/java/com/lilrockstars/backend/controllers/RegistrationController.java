package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRegistrationRequest;
import com.lilrockstars.backend.dto.EventRegistrationDTO;
import com.lilrockstars.backend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService service;

    @Autowired
    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    // Parents
    @PostMapping
    public ResponseEntity<EventRegistrationDTO> signUp(
            @RequestBody CreateRegistrationRequest req,
            Authentication auth
    ) {
        return ResponseEntity.ok(service.signUp(req, auth));
    }

    @GetMapping
    public ResponseEntity<List<EventRegistrationDTO>> myRegs(Authentication auth) {
        return ResponseEntity.ok(service.listMyRegistrations(auth));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id, Authentication auth) {
        service.cancel(id, auth);
        return ResponseEntity.noContent().build();
    }

    // Admin
    @GetMapping("/all")
    public ResponseEntity<List<EventRegistrationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<EventRegistrationDTO>> pending() {
        return ResponseEntity.ok(service.listPending());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        service.approve(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/deny")
    public ResponseEntity<?> deny(@PathVariable Long id) {
        service.deny(id);
        return ResponseEntity.ok().build();
    }
}

   