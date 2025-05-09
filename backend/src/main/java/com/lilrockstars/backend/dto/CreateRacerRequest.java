package com.lilrockstars.backend.dto;

import lombok.Data;

@Data
public class CreateRacerRequest {
    private String name;
    private int age;
}