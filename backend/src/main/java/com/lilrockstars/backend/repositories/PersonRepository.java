package com.lilrockstars.backend.repositories;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByEmail(String email);
    boolean existsByEmail(String email);

    List<Person> findByRole(Role role);
}

