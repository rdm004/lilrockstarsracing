package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.dto.EventRegistrationDTO;
import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.repositories.EventRepository;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.repositories.RacerRepository;
import com.lilrockstars.backend.service.EventService;
import com.lilrockstars.backend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private RegistrationService regService;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventService eventService;

    @Autowired
    private PersonRepository personRepo;

    @Autowired
    private RacerRepository racerRepo;

    // ✅ 1. Get all registrations
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents()); // or eventRepo.findAll()
    }

    // ✅ 2. Get all parents and their racers
    @GetMapping("/parents")
    public ResponseEntity<List<Map<String, Object>>> getParentsAndRacers() {
        List<Person> parents = personRepo.findByRole(com.lilrockstars.backend.entities.Role.PARENT);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Person p : parents) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("email", p.getEmail());

            List<Map<String, Object>> racers = new ArrayList<>();
            for (Racer r : racerRepo.findByParent(p)) {
                Map<String, Object> rmap = new HashMap<>();
                rmap.put("racerId", r.getId());
                rmap.put("firstName", r.getFirstName());
                rmap.put("lastName", r.getLastName());
                rmap.put("age", r.getAge());
                racers.add(rmap);
            }
           entry.put("racers", racers);
           result.add(entry);
        }

       return ResponseEntity.ok(result);
   }
}