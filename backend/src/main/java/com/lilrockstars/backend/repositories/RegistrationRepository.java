package com.lilrockstars.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lilrockstars.backend.entities.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}
