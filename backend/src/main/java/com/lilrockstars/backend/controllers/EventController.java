package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.repositories.EventRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventController {

    private final EventRepository repo;

    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    // 1. List all events
    @GetMapping
    public List<Event> list() {
        return repo.findAll();
    }

    // 2. Get one event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> get(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Create a new event (ADMIN only)
    @PostMapping
    public ResponseEntity<Event> create(@Valid @RequestBody Event event) {
        Event saved = repo.save(event);
        return ResponseEntity.status(201).body(saved);
    }

    // 4. Update an existing event (ADMIN only)
    @PutMapping("/{id}")
    public ResponseEntity<Event> update(
            @PathVariable Long id,
            @Valid @RequestBody Event updated
    ) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setDate(updated.getDate());
                    existing.setLocation(updated.getLocation());
                    Event saved = repo.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Delete an event (ADMIN only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}