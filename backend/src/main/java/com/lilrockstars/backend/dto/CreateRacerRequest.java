package com.lilrockstars.backend.dto;

public class CreateRacerRequest {

    private String firstName;
    private String lastName;
    private int age;
    private Long parentId;

    // ✅ Required public setters
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setAge(int age) { this.age = age; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    // Optional: Add getters if needed
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getAge() { return age; }
    public Long getParentId() { return parentId; }
}