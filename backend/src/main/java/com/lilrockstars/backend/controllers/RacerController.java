package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.service.RacerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/racers")
public class RacerController {

    private final RacerService racerService;

    @Autowired
    public RacerController(RacerService racerService) {
        this.racerService = racerService;
    }

    @GetMapping("/my-racers")
    public ResponseEntity<List<RacerDTO>> myRacers(Authentication auth) {
        return ResponseEntity.ok(racerService.listMyRacers(auth));
    }
    @PostMapping
    public ResponseEntity<RacerDTO> create(@RequestBody CreateRacerRequest req, Authentication auth) {
        RacerDTO created = racerService.create(req, auth);
        return ResponseEntity.ok(created);
    }}
