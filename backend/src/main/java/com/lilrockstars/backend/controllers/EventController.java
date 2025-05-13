
package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.repositories.EventRepository;
import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    private final EventRepository repo;
    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Event> listEvents() {
        return repo.findAll();
    }
}

