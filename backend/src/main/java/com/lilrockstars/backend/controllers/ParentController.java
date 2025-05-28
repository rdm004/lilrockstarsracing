package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.repositories.RacerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin
public class ParentController {

    private final PersonRepository personRepo;
    private final RacerRepository racerRepo;

    @Autowired
    public ParentController(PersonRepository personRepo, RacerRepository racerRepo) {
        this.personRepo = personRepo;
        this.racerRepo = racerRepo;
    }

    // ✅ GET /api/parents — list all parents
    @GetMapping
    public List<Person> getAllParents() {
        return personRepo.findByRole(Role.PARENT);
    }

    // ✅ GET /api/parents/{id}/racers — list racers for parent
    @GetMapping("/{id}/racers")
    public List<Racer> getRacersForParent(@PathVariable Long id) {
        return racerRepo.findByParent_Id(id);
    }
}