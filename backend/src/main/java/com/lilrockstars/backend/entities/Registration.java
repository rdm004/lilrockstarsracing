// Registration.java
package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor
@Entity
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationId;

    @ManyToOne(optional=false)
    @JoinColumn(name="racer_id")
    private Racer racer;

    @ManyToOne(optional=false)
    @JoinColumn(name="event_id")
    private Event event;

    private LocalDateTime timestamp = LocalDateTime.now();

    public void cancel() {

    }
}