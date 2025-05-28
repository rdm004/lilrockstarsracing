package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRegistrationRequest;
import com.lilrockstars.backend.dto.EventRegistrationDTO;
import com.lilrockstars.backend.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    /** List current user’s registrations */
    @GetMapping
    public List<EventRegistrationDTO> listMine(Authentication auth) {
        return registrationService.listForUser(auth);
    }

    /** Sign up a racer (must belong to the logged-in parent) */
    @PostMapping
    public ResponseEntity<Void> register(@Valid @RequestBody CreateRegistrationRequest req,
                                         Authentication auth) {
        registrationService.register(req, auth);
        return ResponseEntity.ok().build();
    }

    /** Admin only: list every pending registration */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pending")
    public List<EventRegistrationDTO> listPending() {
        return registrationService.listPending();
    }

    /** Admin only: approve a registration */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        registrationService.approve(id);
        return ResponseEntity.ok().build();
    }
}