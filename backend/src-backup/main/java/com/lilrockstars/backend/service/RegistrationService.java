package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRegistrationRequest;
import com.lilrockstars.backend.dto.EventRegistrationDTO;
import com.lilrockstars.backend.entities.*;
import com.lilrockstars.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final RegistrationRepository regRepo;
    private final RacerRepository racerRepo;
    private final EventRepository eventRepo;
    private final PersonRepository personRepo;

    @Autowired
    public RegistrationService(RegistrationRepository regRepo,
                               RacerRepository racerRepo,
                               EventRepository eventRepo,
                               PersonRepository personRepo) {
        this.regRepo   = regRepo;
        this.racerRepo = racerRepo;
        this.eventRepo = eventRepo;
        this.personRepo= personRepo;
    }

    public List<EventRegistrationDTO> listForUser(Authentication auth) {
        // find the parent Person
        Person parent = personRepo.findByEmail(auth.getName())
                .orElseThrow();
        // find all racers belonging to that parent
        List<Long> racerIds = racerRepo.findByParentId(parent.getId())
                .stream().map(Racer::getRacerId).collect(Collectors.toList());
        // fetch all regs for those racers
        return regRepo.findByRacer_RacerIdIn(racerIds)
                .stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void register(CreateRegistrationRequest req, Authentication auth) {
        Person parent = personRepo.findByEmail(auth.getName())
                .orElseThrow();
        Racer racer = racerRepo.findById(req.racerId())
                .orElseThrow();
        if (!racer.getParent().getId().equals(parent.getId())) {
            throw new AccessDeniedException("That racer isn’t yours!");
        }
        Event event = eventRepo.findById(req.eventId())
                .orElseThrow();
        Registration reg = new Registration();
        reg.setRacer(racer);
        reg.setEvent(event);
        reg.setStatus(RegistrationStatus.PENDING);
        regRepo.save(reg);
    }

    public List<EventRegistrationDTO> listPending() {
        return regRepo.findByStatus(RegistrationStatus.PENDING)
                .stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void approve(Long id) {
        Registration reg = regRepo.findById(id).orElseThrow();
        reg.setStatus(RegistrationStatus.APPROVED);
        regRepo.save(reg);
    }

    private EventRegistrationDTO toDto(Registration r) {
        return new EventRegistrationDTO(
                r.getRegistrationId(),
                r.getEvent().getEventId(),
                r.getEvent().getName(),
                r.getRacer().getRacerId(),
                r.getRacer().getName(),
                r.getStatus()
        );
    }
}