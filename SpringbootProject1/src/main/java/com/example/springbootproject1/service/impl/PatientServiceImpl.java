package com.example.springbootproject1.service.impl;

import com.example.springbootproject1.dto.PatientDTO;
import com.example.springbootproject1.entity.Student;
import com.example.springbootproject1.repository.PatientRepository;
import com.example.springbootproject1.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository repository;

    @Override
    public Student createPatient(PatientDTO dto) {

        Student patient = new Student();
        patient.setName(dto.getName());
        patient.setEmail(dto.getEmail());
        patient.setDisease(dto.getDisease());

        return repository.save(patient);
    }

    @Override
    public List<Student> getAllPatients() {
        return repository.findAll();
    }

    @Override
    public Student getPatientById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Student updatePatient(Long id, PatientDTO dto) {

        Student patient = repository.findById(id).orElseThrow();

        patient.setName(dto.getName());
        patient.setEmail(dto.getEmail());
        patient.setDisease(dto.getDisease());

        return repository.save(patient);
    }

    @Override
    public void deletePatient(Long id) {
        repository.deleteById(id);
    }
}