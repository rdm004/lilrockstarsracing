package com.lilrockstars.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Payload for POST /api/racers
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRacerRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 1, message = "Age must be at least 1")
    private Integer age;

}