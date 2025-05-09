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
public class Parent extends Person {

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Racer> children;
}