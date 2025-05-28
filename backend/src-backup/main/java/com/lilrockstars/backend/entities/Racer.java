// Racer.java
package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@Entity
public class Racer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long racerId;

    private String name;
    private int age;

    @ManyToOne(optional=false)
    @JoinColumn(name="parent_id")
    private Parent parent;

    @OneToMany(mappedBy = "racer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Registration> registrations;

    public String getDisplayName() {
        return name + " (age " + age + ")";
    }
}