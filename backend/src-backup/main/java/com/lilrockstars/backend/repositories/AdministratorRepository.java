package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
}