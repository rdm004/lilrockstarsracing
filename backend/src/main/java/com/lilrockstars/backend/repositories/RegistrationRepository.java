package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Registration;
import com.lilrockstars.backend.entities.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration,Long> {
    List<Registration> findByStatus(RegistrationStatus status);
    List<Registration> findByRacer_Parent_Id(Long parentPersonId);
}