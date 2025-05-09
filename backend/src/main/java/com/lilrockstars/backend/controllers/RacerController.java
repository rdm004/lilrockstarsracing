package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.service.RacerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/racers")
public class RacerController {

    @Autowired
    private RacerService racerService;

    @GetMapping
    public List<RacerDTO> getAllRacers() {
        return racerService.getAllRacers();
    }

    @PostMapping
    public RacerDTO createRacer(@RequestBody CreateRacerRequest request) {
        return racerService.createRacer(request);
    }
}