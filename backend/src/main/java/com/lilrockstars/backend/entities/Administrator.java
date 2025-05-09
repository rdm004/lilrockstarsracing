package com.lilrockstars.backend.entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Administrator extends Person {
    // Business logic should live in a service, not here.
}