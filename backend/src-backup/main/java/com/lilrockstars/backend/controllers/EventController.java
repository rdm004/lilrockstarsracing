package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.repositories.EventRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventController {

    private final EventRepository repo;

    @Autowired
    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Event> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> get(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Event> create(@Valid @RequestBody Event event) {
        Event saved = repo.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> update(@PathVariable Long id,
                                        @Valid @RequestBody Event event) {
        return repo.findById(id)
                .map(existing -> {
                    event.setEventId(id);
                    return ResponseEntity.ok(repo.save(event));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}