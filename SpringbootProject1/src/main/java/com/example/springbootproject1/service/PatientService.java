package com.example.springbootproject1.service;

import com.example.springbootproject1.dto.PatientDTO;
import com.example.springbootproject1.entity.Student;

import java.util.List;

public interface PatientService {

    Student createPatient(PatientDTO dto);

    List<Student> getAllPatients();

    Student getPatientById(Long id);

    Student updatePatient(Long id, PatientDTO dto);

    void deletePatient(Long id);
}