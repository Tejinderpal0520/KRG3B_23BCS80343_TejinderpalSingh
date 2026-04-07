package com.healthHub.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentRequest {
    private Long patientId;
    private Long doctorId;
    private LocalDate date;
    private Double amount;
    private String paymentIntentId;
}