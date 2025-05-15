// Media.java
package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor
@Entity
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @ManyToOne(optional=false)
    @JoinColumn(name="event_id")
    private Event event;

    private String url;
    private String caption;
    private LocalDateTime uploadedAt = LocalDateTime.now();
}