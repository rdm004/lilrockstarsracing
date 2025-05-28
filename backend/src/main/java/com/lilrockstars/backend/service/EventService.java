package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Create/save an event
    public Event create(Event event) {
        return eventRepository.save(event);
    }

    // Retrieve all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}