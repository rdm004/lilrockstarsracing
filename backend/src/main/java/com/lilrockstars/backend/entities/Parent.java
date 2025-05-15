// Parent.java
package com.lilrockstars.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter @Setter @NoArgsConstructor
@Entity
@DiscriminatorValue("PARENT")
public class Parent extends Person {
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Racer> children;
}