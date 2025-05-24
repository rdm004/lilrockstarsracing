package com.lilrockstars.backend.dto;

import com.lilrockstars.backend.entities.RegistrationStatus;

/**
 * What we send back when listing or signing up for race registrations.
 */
public record EventRegistrationDTO(
        Long registrationId,
        Long eventId,
        String eventName,
        Long racerId,
        String racerName,
        RegistrationStatus status
) {}