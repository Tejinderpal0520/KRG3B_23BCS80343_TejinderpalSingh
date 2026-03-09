package com.example.springbootproject1.repository;

import com.example.springbootproject1.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Student, Long> {

}