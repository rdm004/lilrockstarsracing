package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Racer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RacerRepository extends JpaRepository<Racer, Long> {
    /**
     * Finds all racers whose parent.personId matches the given ID.
     * Adjust “PersonId” to your actual Person.id/Person.personId field name.
     */
    List<Racer> findByParentPersonId(Long personId);
}