package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.entities.Parent;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.repositories.ParentRepository;
import com.lilrockstars.backend.repositories.RacerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RacerService {

    private final RacerRepository racerRepo;
    private final ParentRepository parentRepo;

    public RacerService(RacerRepository racerRepo,
                        ParentRepository parentRepo) {
        this.racerRepo = racerRepo;
        this.parentRepo = parentRepo;
    }

    public List<RacerDTO> getAllRacers() {
        return racerRepo.findAll().stream()
                .map(r -> new RacerDTO(r.getRacerId(), r.getName(), r.getAge()))
                .collect(Collectors.toList());
    }

    public RacerDTO createRacer(CreateRacerRequest req) {
        Parent parent = parentRepo.findById(req.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Parent not found"));
        Racer r = new Racer();
        r.setName(req.getName());
        r.setAge(req.getAge());
        r.setParent(parent);
        Racer saved = racerRepo.save(r);
        return new RacerDTO(saved.getRacerId(), saved.getName(), saved.getAge());
    }
}