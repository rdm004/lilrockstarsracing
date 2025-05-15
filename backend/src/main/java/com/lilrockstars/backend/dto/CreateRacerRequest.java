package com.lilrockstars.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateRacerRequest {
    @NotBlank(message = "Racer name is required")
    private String name;

    @Min(value = 0, message = "Age must be zero or positive")
    private int age;

    @NotNull(message = "Parent ID is required")
    private Long parentId;
}