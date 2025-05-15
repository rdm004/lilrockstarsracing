package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.service.RacerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/racers")
@CrossOrigin
public class RacerController {

    private final RacerService racerService;

    @Autowired
    public RacerController(RacerService racerService) {
        this.racerService = racerService;
    }

    @GetMapping
    public List<RacerDTO> getAll() {
        return racerService.getAllRacers();
    }

    @PostMapping
    public RacerDTO create(@Valid @RequestBody CreateRacerRequest req) {
        return racerService.createRacer(req);
    }
}