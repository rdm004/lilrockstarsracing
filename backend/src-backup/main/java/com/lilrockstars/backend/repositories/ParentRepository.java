package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentRepository extends JpaRepository<Parent, Long> {
}
