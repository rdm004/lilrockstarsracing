package com.lilrockstars.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lilrockstars.backend.entities.Racer;

public interface RacerRepository extends JpaRepository<Racer, Long> {
}
