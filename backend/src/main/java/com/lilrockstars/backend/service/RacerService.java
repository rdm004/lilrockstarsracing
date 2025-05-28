package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.repositories.RacerRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RacerService {

    private final RacerRepository     racerRepo;
    private final PersonRepository    personRepo;

    public RacerService(RacerRepository racerRepo,
                        PersonRepository personRepo) {
        this.racerRepo  = racerRepo;
        this.personRepo = personRepo;
    }

    /** Parent creates a new Racer */
    @Transactional
    public RacerDTO create(CreateRacerRequest req, Authentication auth) {
        // 1) lookup the logged-in Person & ensure they’re a PARENT
        Person parent = personRepo.findByEmail(auth.getName())
                .filter(p -> p.getRole() == Role.PARENT)
                .orElseThrow(() -> new IllegalArgumentException("Not a parent"));

        // 2) build, set ownership, and save
        Racer r = new Racer();
        r.setFirstName(req.getFirstName());
        r.setLastName(req.getLastName());
        r.setAge(req.getAge());
        r.setParent(parent);
        Racer saved = racerRepo.save(r);

        return toDto(saved);
    }

    /** Parent lists their own racers */
    @Transactional(readOnly = true)
    public List<RacerDTO> listMyRacers(Authentication auth) {
        Long parentId = personRepo.findByEmail(auth.getName())
                .filter(p -> Role.PARENT.equals(p.getRole()))
                .map(Person::getId)
                .orElseThrow(() -> new IllegalArgumentException("Not a parent"));

        return racerRepo.findByParent_Id(parentId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /* helper: turn entity into your RacerDTO record */
    private RacerDTO toDto(Racer r) {
        return new RacerDTO(
                r.getId(),
                r.getFirstName(),
                r.getLastName(),
                r.getAge()
        );
    }
    public List<RacerDTO> getAll() {
        return racerRepo.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }
}