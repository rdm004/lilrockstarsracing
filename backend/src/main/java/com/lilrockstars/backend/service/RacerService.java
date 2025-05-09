package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRacerRequest;
import com.lilrockstars.backend.dto.RacerDTO;
import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.repositories.RacerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RacerService {

    @Autowired
    private RacerRepository racerRepository;

    public List<RacerDTO> getAllRacers() {
        return racerRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public RacerDTO createRacer(CreateRacerRequest request) {
        Racer racer = new Racer();
        racer.setName(request.getName());
        racer.setAge(request.getAge());
        return toDTO(racerRepository.save(racer));
    }

    private RacerDTO toDTO(Racer racer) {
        RacerDTO dto = new RacerDTO();
        dto.setId(racer.getRacerId());
        dto.setName(racer.getName());
        dto.setAge(racer.getAge());
        return dto;
    }
}