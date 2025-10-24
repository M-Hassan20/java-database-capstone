package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
public class Appointment {

    public Appointment() {
    }
    public Appointment(long id, Doctor doctor, Patient pateint, LocalDateTime appointmentTime, int status) {
        this.id = id;
        this.doctor = doctor;
        this.pateint = pateint;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

@ManyToOne
@NotNull(message = "doctor cannot be null")
    private Doctor doctor;

@ManyToOne
@NotNull
    private Patient pateint;

@Future(message = "Time must be in future")
    private LocalDateTime appointmentTime;

@NotNull(message = "status can only be 0 or 1")
    private int status;

@Transient
    private LocalDateTime getEndTime() {
        return appointmentTime.plusHours(1);
    }

@Transient
    private LocalDate getAppointmentDate() {
        return appointmentTime.toLocalDate();
    }

@Transient
    private LocalTime getAppointmentTimeOnly() {
        return appointmentTime.toLocalTime();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPateint() {
        return pateint;
    }

    public void setPateint(Patient pateint) {
        this.pateint = pateint;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}

