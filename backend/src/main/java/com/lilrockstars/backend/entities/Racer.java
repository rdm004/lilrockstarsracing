package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Racer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long racerId;

    private String name;
    private int age;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @OneToMany(mappedBy = "racer", cascade = CascadeType.ALL)
    private List<Registration> registrations;

    @OneToMany(mappedBy = "racer", cascade = CascadeType.ALL)
    private List<Media> media;
}
