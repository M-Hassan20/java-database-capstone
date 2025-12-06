/*
  Functionality for creating a dynamic Doctor Card with role-specific actions.
*/

// Import necessary functions (assuming relative paths)
import { openBookingOverlay } from './loggedPatient.js'; // Import overlay function
import { deleteDoctor } from './doctorServices.js';    // Import delete API function
import { fetchPatientDetails } from './patientServices.js'; // Import function to fetch patient details


/**
 * Creates and returns a DOM element for a single doctor card.
 * @param {object} doctor - The doctor data object from the API.
 * @returns {HTMLElement} The complete doctor card element.
 */
export function createDoctorCard(doctor) {
    // Function to create and return a DOM element for a single doctor card
    
    // Create the main container for the doctor card
    const card = document.createElement('div');
    card.className = 'doctor-card';
    card.dataset.doctorId = doctor.doctorId; // Store doctor ID for actions

    // Retrieve the current user role from localStorage
    const userRole = localStorage.getItem("userRole");

    // Create a div to hold doctor information
    const infoContainer = document.createElement('div');
    infoContainer.className = 'doctor-info';

    // Create and set the doctor’s name
    const nameEl = document.createElement('h3');
    nameEl.textContent = doctor.name;
    nameEl.className = 'doctor-name';

    // Create and set the doctor's specialization
    const specializationEl = document.createElement('p');
    specializationEl.textContent = doctor.specialization;
    specializationEl.className = 'doctor-specialty';

    // Create and set the doctor's email
    const emailEl = document.createElement('p');
    emailEl.textContent = `Email: ${doctor.email}`;
    emailEl.className = 'doctor-email';

    // Create and list available appointment times
    const timesEl = document.createElement('div');
    timesEl.className = 'appointment-times';
    timesEl.innerHTML = `<h4>Available Slots:</h4>
                         <ul>${doctor.availableTimes.map(time => `<li>${time}</li>`).join('')}</ul>`;

    // Append all info elements to the doctor info container
    infoContainer.appendChild(nameEl);
    infoContainer.appendChild(specializationEl);
    infoContainer.appendChild(emailEl);
    infoContainer.appendChild(timesEl);

    // Create a container for card action buttons
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'doctor-actions';


    // === ADMIN ROLE ACTIONS ===
    if (userRole === 'admin') {
        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Doctor';
        deleteBtn.className = 'adminBtn delete-btn';

        // Add click handler for delete button
        deleteBtn.addEventListener('click', async () => {
            if (confirm(`Are you sure you want to delete Doctor ${doctor.name}?`)) {
                // Get the admin token from localStorage
                const adminToken = localStorage.getItem("token");

                if (!adminToken) {
                    alert("Authentication token missing. Please log in again.");
                    return;
                }

                try {
                    // Call API to delete the doctor
                    await deleteDoctor(doctor.doctorId, adminToken);
                    
                    // Show result and remove card if successful
                    alert(`Doctor ${doctor.name} successfully deleted.`);
                    card.remove();

                } catch (error) {
                    alert(`Failed to delete doctor: ${error.message}`);
                }
            }
        });

        // Add delete button to actions container
        actionsContainer.appendChild(deleteBtn);
    } 
    
    // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
    else if (userRole === 'patient') {
        // Create a book now button
        const bookBtn = document.createElement('button');
        bookBtn.textContent = 'Book Now';
        bookBtn.className = 'book-now-btn';

        // Alert patient to log in before booking
        bookBtn.addEventListener('click', () => {
            alert('Please log in or sign up to book an appointment.');
            // Optionally, open the login modal here
            // openModal('patientLogin');
        });

        // Add button to actions container
        actionsContainer.appendChild(bookBtn);
    } 
    
    // === LOGGED-IN PATIENT ROLE ACTIONS === 
    else if (userRole === 'loggedPatient') {
        // Create a book now button
        const bookBtn = document.createElement('button');
        bookBtn.textContent = 'Book Appointment';
        bookBtn.className = 'book-now-btn primary-btn';

        // Handle booking logic for logged-in patient 
        bookBtn.addEventListener('click', async () => {
            const patientToken = localStorage.getItem("token");
            const patientId = localStorage.getItem("patientId"); // Assuming patientId is stored

            // Redirect if token not available
            if (!patientToken || !patientId) {
                alert("Session expired. Please log in again.");
                window.location.href = "/"; // Redirect to role selection/login
                return;
            }

            try {
                // Fetch patient data with token
                const patientData = await fetchPatientDetails(patientId, patientToken);
                
                // Show booking overlay UI with doctor and patient info
                openBookingOverlay(doctor, patientData);

            } catch (error) {
                alert(`Error preparing booking: ${error.message}`);
            }
        });

        // Add button to actions container
        actionsContainer.appendChild(bookBtn);
    }

    // Append doctor info and action buttons to the card
    card.appendChild(infoContainer);
    card.appendChild(actionsContainer);

    // Return the complete doctor card element
    return card;
}