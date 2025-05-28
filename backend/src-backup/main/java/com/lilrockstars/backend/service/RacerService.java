package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.repositories.RacerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RacerService {

    private final RacerRepository repo;

    @Autowired
    public RacerService(RacerRepository repo) {
        this.repo = repo;
    }

    public List<RacerDTO> listAll() {
        return repo.findAll().stream()
                .map(r -> new RacerDTO(r.getRacerId(), r.getName(), r.getAge()))
                .collect(Collectors.toList());
    }

    public Optional<RacerDTO> getById(Long id) {
        return repo.findById(id)
                .map(r -> new RacerDTO(r.getRacerId(), r.getName(), r.getAge()));
    }

    public RacerDTO create(CreateRacerRequest req) {
        Racer r = new Racer();
        r.setName(req.getName());
        r.setAge(req.getAge());
        // you’ll need to set parent here if you support that
        Racer saved = repo.save(r);
        return new RacerDTO(saved.getRacerId(), saved.getName(), saved.getAge());
    }

    public Optional<RacerDTO> update(Long id, CreateRacerRequest req) {
        return repo.findById(id).map(r -> {
            r.setName(req.getName());
            r.setAge(req.getAge());
            Racer saved = repo.save(r);
            return new RacerDTO(saved.getRacerId(), saved.getName(), saved.getAge());
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}