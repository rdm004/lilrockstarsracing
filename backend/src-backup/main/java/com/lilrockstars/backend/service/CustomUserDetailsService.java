package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PersonRepository personRepo;

    @Autowired
    public CustomUserDetailsService(PersonRepository personRepo) {
        this.personRepo = personRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user with email: " + email));

        return User.builder()
                .username(person.getEmail())
                .password(person.getPassword())
                .roles(person.getRole().name())   // will map Role.ADMIN → ROLE_ADMIN, Role.PARENT → ROLE_PARENT
                .build();
    }
}