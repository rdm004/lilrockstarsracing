package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PersonRepository personRepo;

    @Autowired
    public CustomUserDetailsService(PersonRepository personRepo) {
        this.personRepo = personRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + person.getRole().name()) // <- KEY
        );

        return new org.springframework.security.core.userdetails.User(
                person.getEmail(),
                person.getPassword(),
                authorities
        );
    }
}