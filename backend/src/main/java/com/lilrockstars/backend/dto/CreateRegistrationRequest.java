package com.lilrockstars.backend.dto;

public class CreateRegistrationRequest {

    private Long racerId;
    private Long eventId;

    // Getters and Setters
    public Long getRacerId() {
        return racerId;
    }

    public void setRacerId(Long racerId) {
        this.racerId = racerId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}