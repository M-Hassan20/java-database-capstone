## Admin User Stories
1)
Title: As an admin, I want to log into the portal using my username and password, so that I can securely manage the platform.

Acceptance Criteria:

The system should allow the admin to enter valid credentials to log in.

Invalid credentials should result in an error message.

After successful login, the admin should be redirected to the dashboard.

Priority: High
Story Points: 3

2)
Title: As an admin, I want to log out of the portal, so that I can protect the system from unauthorized access.

Acceptance Criteria:

The system should provide a visible logout option on all admin pages.

After logout, the session should be terminated.

The user should be redirected to the login page.

Priority: High
Story Points: 2

3)
Title: As an admin, I want to add a doctor’s profile to the portal, so that new doctors can be registered and start using the platform.

Acceptance Criteria:

Admin can access an “Add Doctor” form from the dashboard.

Required fields (name, specialization, contact info, etc.) must be validated.

A success message should appear after successful addition.

Priority: High
Story Points: 4

4)
Title: As an admin, I want to delete a doctor’s profile from the portal, so that I can remove inactive or incorrect accounts from the system.

Acceptance Criteria:

Admin can view a list of registered doctors.

Admin can select and confirm deletion of a doctor’s profile.

The doctor’s data should be safely removed or archived as per policy.

Priority: Medium
Story Points: 3

5)
Title: As an admin, I want to run a stored procedure in the MySQL CLI to get the number of appointments per month, so that I can track platform usage statistics.

Acceptance Criteria:

The system should have a stored procedure that returns monthly appointment counts.

The output should be displayed clearly or exported as a report.

The admin should be able to execute it securely without affecting other data.

Priority: Medium
Story Points: 5

## Patient User Stories

1)
Title: As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering.

Acceptance Criteria:

The system should display a list of all available doctors to unregistered users.

The list should include doctor details such as name, specialization, and availability.

Patients should be prompted to sign up or log in if they attempt to book an appointment.

Priority: Medium
Story Points: 3

2)
Title: As a patient, I want to sign up using my email and password, so that I can book appointments.

Acceptance Criteria:

The system should provide a registration form for new patients.

All required fields (name, email, password) must be validated.

A success message should confirm successful registration.

Priority: High
Story Points: 3

3)
Title: As a patient, I want to log into the portal, so that I can manage my bookings.

Acceptance Criteria:

The system should authenticate patients using valid credentials.

Invalid credentials should trigger an appropriate error message.

Successful login should redirect the patient to their dashboard.

Priority: High
Story Points: 2

4)
Title: As a patient, I want to log out of the portal, so that I can secure my account.

Acceptance Criteria:

The system should provide a logout button on all pages after login.

Logging out should end the session and redirect to the homepage or login screen.

The user should not be able to access private pages after logout.

Priority: High
Story Points: 2

5)
Title: As a patient, I want to book an hour-long appointment with a doctor, so that I can consult with them.

Acceptance Criteria:

The patient should be able to view doctor availability before booking.

The system should allow selecting a date and time slot (1 hour).

A confirmation message should be shown upon successful booking.

Priority: High
Story Points: 4

6)
Title: As a patient, I want to view my upcoming appointments, so that I can prepare accordingly.

Acceptance Criteria:

The system should display all future appointments for the logged-in patient.

Each appointment entry should include the doctor’s name, date, time, and status.

Past appointments should be excluded or shown separately.

Priority: Medium
Story Points: 3

## Doctor User Stories

1)
Title: As a doctor, I want to log into the portal, so that I can manage my appointments.

Acceptance Criteria:

The portal should allow doctors to log in using valid credentials.

Invalid credentials should produce an error message.

Upon successful login, the doctor should be redirected to their appointment dashboard.

Priority: High
Story Points: 3

2)
Title: As a doctor, I want to log out of the portal, so that I can protect my data.

Acceptance Criteria:

The system should provide a logout option accessible from any page.

Logging out should terminate the active session.

The doctor should be redirected to the login or home page after logout.

Priority: High
Story Points: 2

3)
Title: As a doctor, I want to view my appointment calendar, so that I can stay organized.

Acceptance Criteria:

The system should display all upcoming appointments in a calendar view.

Appointments should show patient names, time, and status (confirmed, completed, etc.).

The doctor should be able to filter or navigate by day, week, or month.

Priority: High
Story Points: 4

4)
Title: As a doctor, I want to mark my unavailability, so that patients can only book available slots.

Acceptance Criteria:

The doctor should be able to select specific days or times to mark as unavailable.

Unavailable slots should be hidden or disabled from the patient booking interface.

The system should save and reflect the updated availability immediately.

Priority: High
Story Points: 5

5)
Title: As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information.

Acceptance Criteria:

The doctor should be able to edit profile fields like name, specialization, and contact info.

The updated information should be reflected on the patient-facing doctor list.

The system should validate input before saving changes.

Priority: Medium
Story Points: 3

6)
Title: As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared.

Acceptance Criteria:

The doctor should be able to access patient details (name, age, condition, contact) for each appointment.

The information should only be visible for confirmed upcoming appointments.

The data should be displayed securely, respecting privacy protocols.

Priority: High
Story Points: 4
