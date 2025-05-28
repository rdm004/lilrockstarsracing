// src/main/java/com/lilrockstars/backend/entities/Parent.java
package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "parent")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")      // <<— tell JPA this maps to the DB’s "id" column
    private Long personId;

    private String email;
    private String firstName;
    private String lastName;
}