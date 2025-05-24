package com.lilrockstars.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;


public record RacerDTO(
        Long racerId,
        String name,
        Integer age
) {}