package com.healthHub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAppointmentConfirmation(String toEmail, String patientName, String doctorName, String date) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Appointment Confirmation - HealthHub");
        message.setText(
                "Hello " + patientName + ",\n\n" +
                        "Your appointment has been successfully booked.\n\n" +
                        "Doctor: " + doctorName + "\n" +
                        "Date: " + date + "\n\n" +
                        "Thank you for using HealthHub."
        );

        mailSender.send(message);
    }
}