package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Racer;
import com.lilrockstars.backend.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RacerRepository extends JpaRepository<Racer, Long> {

    // Find all racers whose parent's ID matches
    List<Racer> findByParent_Id(Long parentId);

    // Optionally: find all racers by parent object (if needed)
    List<Racer> findByParent(Person parent);
}