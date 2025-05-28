package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "racer")
@Getter @Setter @NoArgsConstructor
public class Racer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "racer_id")
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private Integer age;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private Person parent;
}