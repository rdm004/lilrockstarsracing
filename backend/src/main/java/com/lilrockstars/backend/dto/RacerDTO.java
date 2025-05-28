package com.lilrockstars.backend.dto;

public class RacerDTO {

    private Long racerId;
    private String firstName;
    private String lastName;
    private Integer age;

    // ✅ All-args constructor for clean DTO creation
    public RacerDTO(Long racerId, String firstName, String lastName, Integer age) {
        this.racerId = racerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // ✅ No-args constructor for frameworks (e.g., Jackson)
    public RacerDTO() {}

    // ✅ Getters
    public Long getRacerId() {
        return racerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getAge() {
        return age;
    }

    // ✅ Setters
    public void setRacerId(Long racerId) {
        this.racerId = racerId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}