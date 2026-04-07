package com.healthHub.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 1, message = "Age must be greater than 0")
    private int age;

    @NotBlank(message = "Disease field should not be empty")
    private String disease;

    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;
}