# Summary of Architecture Design
The project uses Spring MVC and REST API Controllers. The View part displays the admin, doctor and user dashboards, and this is what the users see and interact with. This is displayed using Thymeleaf templates.
The controller receives user requests and passes them to the model, which fetches/updates data according to the request.

# Request - Response Cycle
1) Users access the system using their respective dashboards.
2) The user request is routed to the backend controller.
3) Business rules and logic/validation are applied according to the request
4) Database repositories are accessed to perform data access operations.
5) Repositories access the database.
6) Data is retrieved and is mapped to model Java classes.
7) Bound models are passed to the response layer where they are mapped to thymeleaf templates or they are serialized into JSON.

## MySQL Database Design
    ### Table: Patients
    - id: INT, Primary Key auto_increment,
    - name: VARCHAR(100), NOT NULL
    - email: VARCHAR(100), NOT NULL,
    - password_hash: VARCHAR(255) NOT NULL,
    - gender: ENUM('Male', 'Female', 'Other'), NULLABLE,
    - dob: DATE, NULLABLE
    - contact_number: VARCHAR(20) NULLABLE,
    - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP()
    
    ### Table: Doctors
    - id: INT, Primary Key, auto increment
    - name: VARCHAR(100), NOT NULL
    - email: VARCHAR(100), NOT NULL,
    - password_hash: VARCHAR(255) NOT NULL,
    - specialization: VARCHAR(100) NOT NULL, 
    - contact_number: VARCHAR(20) NULLABLE,
    - availability_status: ENUM('Available', 'Unavailable') DEFAULT 'Available',
    - profile_updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP()
    ### Table: Appointments
    - id:  INT, Primary Key auto_increment,
    - patient_id: INT, FOREIGN KEY -> (Patients),
    - doctor_id: INT, FOREIGN KEY -> (Doctors),
    - appointment_date: DATE NOT NULL,
    - appointment_time: TIME NOT NULL,
    - duration_minutes: INT DEFAULT 60,
    - status: ENUM('Booked', 'Completed', 'Canceled'),
    - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP()
    
    ### Table: Admin
    - id: INT, Primary Key, auto increment
    - username: VARCHAR(100), NOT NULL
    - email: VARCHAR(100), NOT NULL,
    - password_hash: VARCHAR(255) NOT NULL,
    - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP()

    ### Table: Doctor_Availability
    - avaialability_id: INT, Primary Key, auto_increment,
    - doctor_id: INT, FOREIGN KEY -> (Doctors),
    - date: DATE NOT NULL,
    - start_time: TIME NOT NULL,
    - end_time: NOT NULL,
    - is_available: BOOLEAN DEFAULT TRUE

    ### Table: Appointment_History
    - id: INT Primary Key auto_increment,
    - appointment_id: INT FOREIGN KEY -> (Appointments),
    - action: ENUM('Created', 'Updated', 'Canceled'),
    - timestamp: DATETIME
    - modified_by: VARCHAR(50)

## MongoDB Collection Design

  ### Collection: Prescriptions:

```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}```

  ### Collection: Logs

```json
{
  "_id": "ObjectId('64abc123456')",
  "timestamp": "2025-10-18T11:00:00Z",
  "user_id": "456",
  "action": "Prescription created",
  "details": "Doctor 123 issued a new prescription for Patient 456"
}```

  ### Collection: Feedback

```json
{
  "feedback_id": "UUID",
  "patient_id": "456",
  "doctor_id": "123",
  "appointment_id": "789",
  "rating": 4,
  "comments": "Doctor was very kind and explained the treatment well.",
  "submitted_at": "2025-10-18T14:20:00Z"
}```
