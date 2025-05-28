package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaRepository extends JpaRepository<Media,Long> {
    List<Media> findByEvent_EventId(Long eventId);
    Optional<Media> findById(Long id);
}
