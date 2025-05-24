package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.service.RacerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/racers")
@CrossOrigin
public class RacerController {

    private final RacerService service;

    @Autowired
    public RacerController(RacerService service) {
        this.service = service;
    }

    @GetMapping
    public List<RacerDTO> list() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RacerDTO> get(@PathVariable Long id) {
        return service.getById(id)
                .map(r -> ResponseEntity.ok(r))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RacerDTO> create(@Valid @RequestBody CreateRacerRequest req) {
        RacerDTO created = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RacerDTO> update(@PathVariable Long id,
                                           @Valid @RequestBody CreateRacerRequest req) {
        return service.update(id, req)
                .map(r -> ResponseEntity.ok(r))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}