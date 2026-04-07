package com.healthHub.controller;

import com.healthHub.dto.PatientDTO;
import com.healthHub.entity.Patient;
import com.healthHub.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<?> createPatient(@Valid @RequestBody PatientDTO patientDTO,
                                           BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        PatientDTO savedPatient = patientService.createPatient(patientDTO);
        return ResponseEntity.ok(savedPatient);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/disease")
    public ResponseEntity<List<Patient>> getPatientByDisease(@RequestParam String disease) {
        return ResponseEntity.ok(patientService.findByDisease(disease));
    }
}