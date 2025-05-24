package com.lilrockstars.backend.dto;
import jakarta.validation.constraints.NotNull;

public record CreateRegistrationRequest(
        @NotNull Long racerId,
        @NotNull Long eventId
) {}
