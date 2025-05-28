package com.lilrockstars.backend.service;

import com.lilrockstars.backend.dto.CreateRegistrationRequest;
import com.lilrockstars.backend.dto.EventRegistrationDTO;
import com.lilrockstars.backend.entities.Registration;
import com.lilrockstars.backend.entities.RegistrationStatus;
import com.lilrockstars.backend.entities.Role;
import com.lilrockstars.backend.repositories.EventRepository;
import com.lilrockstars.backend.repositories.PersonRepository;
import com.lilrockstars.backend.repositories.RacerRepository;
import com.lilrockstars.backend.repositories.RegistrationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService  {

    private final RegistrationRepository regRepo;
    private final RacerRepository        racerRepo;
    private final EventRepository        eventRepo;
    private final PersonRepository       personRepo;
    private final RegistrationRepository registrationRepository;

    public RegistrationService(
            RegistrationRepository regRepo,
            RacerRepository racerRepo,
            EventRepository eventRepo,
            PersonRepository personRepo,
            RegistrationRepository registrationRepository) {
        this.regRepo    = regRepo;
        this.racerRepo  = racerRepo;
        this.eventRepo  = eventRepo;
        this.personRepo = personRepo;
        this.registrationRepository = registrationRepository;
    }

    /** Parent signs up a racer for an event */
    @Transactional
    public EventRegistrationDTO signUp(CreateRegistrationRequest req, Authentication auth) {
        // 1) look up the logged-in person, ensure they’re a parent, then grab the id
        Long parentId = personRepo.findByEmail(auth.getName())
                .filter(p -> p.getRole() == Role.PARENT)
                .map(p -> p.getId())
                .orElseThrow(() -> new IllegalArgumentException("Not a parent"));

        // 2) fetch the racer and check ownership
        var racer = racerRepo.findById(req.getRacerId())
                .orElseThrow(() -> new IllegalArgumentException("Racer not found"));
        if (!racer.getParent().getId().equals(parentId)) {
            throw new IllegalArgumentException("Racer does not belong to you");
        }

        // 3) fetch the event
        var event = eventRepo.findById(req.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        // 4) build & save the registration
        Registration reg = new Registration();
        reg.setRacer(racer);
        reg.setEvent(event);
        reg = regRepo.save(reg);

        return toDto(reg);
    }

    /** Parent lists their own registrations */
    @Transactional(readOnly = true)
    public List<EventRegistrationDTO> listMyRegistrations(Authentication auth) {
        Long parentId = personRepo.findByEmail(auth.getName())
                .filter(p -> p.getRole() == Role.PARENT)
                .map(p -> p.getId())
                .orElseThrow();

        return regRepo.findByRacer_Parent_Id(parentId)
                           .stream()
                           .map(this::toDto)
                           .collect(Collectors.toList());
    }

    /** Parent cancels one of their registrations */
    @Transactional
    public void cancel(Long regId, Authentication auth) {
        Registration r = regRepo.findById(regId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));

        Long parentId = personRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new IllegalArgumentException("Should never happen"))
                .getId();

        if (!r.getRacer().getParent().getId().equals(parentId)) {
            throw new IllegalArgumentException("Not your registration");
        }
        r.setStatus(RegistrationStatus.CANCELED);
        regRepo.save(r);
    }

    /** Admin approves a pending registration */
    @Transactional
    public void approve(Long regId) {
        Registration r = regRepo.findById(regId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));
        r.setStatus(RegistrationStatus.APPROVED);
        regRepo.save(r);
    }

    /** Admin lists all pending */
    @Transactional(readOnly = true)
    public List<EventRegistrationDTO> listPending() {
        return regRepo.findByStatus(RegistrationStatus.PENDING)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private EventRegistrationDTO toDto(Registration r) {
        return new EventRegistrationDTO(
                r.getRegistrationId(),
                r.getEvent().getEventId(),
                r.getEvent().getName(),
                r.getRacer().getId(),
                r.getRacer().getFirstName() + " " + r.getRacer().getLastName(),
                r.getStatus().name()
        );
    }
    public List<EventRegistrationDTO> getAll() {
        return registrationRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }
    public void deny(Long regId) {
        Registration r = regRepo.findById(regId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));
        r.setStatus(RegistrationStatus.DENIED);
        regRepo.save(r);
    }
    public void cancelAsAdmin(Long regId) {
        Registration r = regRepo.findById(regId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));
        r.setStatus(RegistrationStatus.CANCELED);
        regRepo.save(r);
    }
}