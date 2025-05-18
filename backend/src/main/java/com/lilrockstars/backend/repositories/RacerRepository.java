package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Racer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RacerRepository extends JpaRepository<Racer,Long> {
    // finds all racers whose parent.id = ?
    List<Racer> findByParent_Id(Long parentId);
}