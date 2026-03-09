package com.example.springbootproject1.controller;

import com.example.springbootproject1.dto.PatientDTO;
import com.example.springbootproject1.entity.Student;
import com.example.springbootproject1.service.PatientService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Student> createPatient(@Valid @RequestBody PatientDTO dto){
        Student patient = service.createPatient(dto);
        return new ResponseEntity<>(patient, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllPatients() {
        List<Student> patients = service.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getPatientById(@PathVariable Long id){
        Student patient = service.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientDTO dto) {

        Student updatedPatient = service.updatePatient(id, dto);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        service.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}