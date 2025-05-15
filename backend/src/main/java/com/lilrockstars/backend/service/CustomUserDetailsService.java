package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Person;
import com.lilrockstars.backend.repositories.PersonRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PersonRepository personRepo;

    public CustomUserDetailsService(PersonRepository personRepo) {
        this.personRepo = personRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user with email: " + email));

        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(person.getRole().name())
        );

        return new User(
                person.getEmail(),
                person.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}