package com.lilrockstars.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RacerDTO {
    private Long racerId;
    private String name;
    private int age;
}