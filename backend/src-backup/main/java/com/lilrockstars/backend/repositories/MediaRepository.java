package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
