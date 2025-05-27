package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Get the role enum and prefix it
        String role = "ROLE_" + person.getRole().name(); // enum -> string with "ROLE_" prefix

        return new org.springframework.security.core.userdetails.User(
                person.getEmail(),
                person.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}