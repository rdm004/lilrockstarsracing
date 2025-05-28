package com.lilrockstars.backend.dto;

public class EventRegistrationDTO {

    private Long registrationId;
    private Long eventId;
    private String eventName;
    private Long racerId;
    private String racerName;
    private String status;

    public EventRegistrationDTO(Long registrationId, Long eventId, String eventName,
                                Long racerId, String racerName, String status) {
        this.registrationId = registrationId;
        this.eventId = eventId;
        this.eventName = eventName;
        this.racerId = racerId;
        this.racerName = racerName;
        this.status = status;
    }

    // Add getters and setters
    public Long getRegistrationId() { return registrationId; }
    public Long getEventId() { return eventId; }
    public String getEventName() { return eventName; }
    public Long getRacerId() { return racerId; }
    public String getRacerName() { return racerName; }
    public String getStatus() { return status; }

    public void setRegistrationId(Long registrationId) { this.registrationId = registrationId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public void setRacerId(Long racerId) { this.racerId = racerId; }
    public void setRacerName(String racerName) { this.racerName = racerName; }
    public void setStatus(String status) { this.status = status; }
}