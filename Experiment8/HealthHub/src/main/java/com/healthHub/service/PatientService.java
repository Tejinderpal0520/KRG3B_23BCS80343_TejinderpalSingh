package com.healthHub.service;

import com.healthHub.dto.PatientDTO;
import com.healthHub.entity.Doctor;
import com.healthHub.entity.Patient;
import com.healthHub.repository.DoctorRepository;
import com.healthHub.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public PatientService(PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = mapToEntity(patientDTO);
        Patient savedPatient = patientRepository.save(patient);
        return mapToDto(savedPatient);
    }

    public Patient mapToEntity(PatientDTO patientDTO) {
        Patient patient = new Patient();
        patient.setName(patientDTO.getName());
        patient.setAge(patientDTO.getAge());
        patient.setDisease(patientDTO.getDisease());
        patient.setEmail(patientDTO.getEmail());

        if (patientDTO.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(patientDTO.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            patient.setDoctor(doctor);
        }

        return patient;
    }

    public PatientDTO mapToDto(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setName(patient.getName());
        dto.setAge(patient.getAge());
        dto.setDisease(patient.getDisease());
        dto.setEmail(patient.getEmail());

        if (patient.getDoctor() != null) {
            dto.setDoctorId(patient.getDoctor().getId());
        }

        return dto;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public List<Patient> findByDisease(String disease) {
        return patientRepository.findByDisease(disease);
    }
}