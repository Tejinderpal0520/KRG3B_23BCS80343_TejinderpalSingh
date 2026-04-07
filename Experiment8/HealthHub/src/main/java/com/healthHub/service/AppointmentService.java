package com.healthHub.service;

import com.healthHub.dto.PaymentRequest;
import com.healthHub.entity.Appointment;
import com.healthHub.entity.Doctor;
import com.healthHub.entity.Patient;
import com.healthHub.repository.AppointmentRepository;
import com.healthHub.repository.DoctorRepository;
import com.healthHub.repository.PatientRepository;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repo;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EmailService emailService;

    public String bookAppointment(PaymentRequest request) throws Exception {

        PaymentIntent intent = PaymentIntent.retrieve(request.getPaymentIntentId());

        System.out.println("STATUS: " + intent.getStatus());

        if (!"succeeded".equals(intent.getStatus())) {
            throw new RuntimeException("Payment not successful");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appt = new Appointment();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setAppointmentDate(request.getDate());
        appt.setPaymentIntentId(request.getPaymentIntentId());
        appt.setPaymentStatus("SUCCESS");

        repo.save(appt);

        if (patient.getEmail() != null && !patient.getEmail().isEmpty()) {
            emailService.sendAppointmentConfirmation(
                    patient.getEmail(),
                    patient.getName(),
                    doctor.getName(),
                    request.getDate().toString()
            );
        }

        return "Appointment booked successfully";
    }
}