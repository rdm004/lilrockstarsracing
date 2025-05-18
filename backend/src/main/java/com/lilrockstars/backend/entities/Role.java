package com.lilrockstars.backend.entities;

/**
 * Mirrors the @DiscriminatorValue strings on your subclasses.
 * SINGLE_TABLE discriminator column 'role' will be either "PARENT" or "ADMIN".
 */


public enum Role {
    PARENT,
    ADMIN
}