/*
  doctorDashboard.js: Logic for the doctor dashboard, handling appointment display and filtering.
*/

// Import service functions and component creation functions
import { getAllAppointments } from './appointmentServices.js'; // Assuming appointmentServices.js exists
import { createPatientRow } from './patientRowComponent.js'; // Assuming a component to create table rows

// DOM Elements
const patientTableBody = document.getElementById("patientTableBody");
const datePicker = document.getElementById("datePicker");
const searchBar = document.getElementById("searchBar");
const todayButton = document.getElementById("todayButton");
const doctorId = localStorage.getItem("doctorId"); // Assuming doctor ID is stored upon login

// Initialization
// Initialize selectedDate with today's date in 'YYYY-MM-DD' format
const today = new Date().toISOString().slice(0, 10);
let selectedDate = today;

// Get the saved token from localStorage (used for authenticated API calls)
const token = localStorage.getItem("token");

// Initialize patientName to null (used for filtering by name)
let patientName = null;

// Set the date picker default value and max date
if (datePicker) {
    datePicker.value = selectedDate;
    datePicker.max = today; // Doctors usually only view current or past appointments
}

/**
 * Function: loadAppointments
 * Purpose: Fetch and display appointments based on selected date and optional patient name
 */
async function loadAppointments() {
    if (!token) {
        patientTableBody.innerHTML = '<tr><td colspan="5">Authentication token missing. Please log in again.</td></tr>';
        return;
    }

    // Step 2: Clear the table body content before rendering new rows
    patientTableBody.innerHTML = '<tr><td colspan="5">Loading appointments...</td></tr>';

    try {
        // Step 1: Call getAllAppointments with doctorId, selectedDate, patientName, and token
        const appointments = await getAllAppointments(doctorId, selectedDate, patientName, token);

        // Step 2: Clear the table body content (re-clear after loading message)
        patientTableBody.innerHTML = '';

        // Step 3: If no appointments are returned:
        if (!appointments || appointments.length === 0) {
            // Display a message row: "No Appointments found for today."
            const dateDisplay = selectedDate === today ? "today" : selectedDate;
            patientTableBody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">No appointments found for ${dateDisplay}.</td></tr>`;
            return;
        }

        // Step 4: If appointments exist:
        appointments.forEach(appt => {
            // Loop through each appointment and construct a 'patient' object
            const patient = {
                id: appt.patientId, // Assuming data structure
                name: appt.patientName,
                phone: appt.patientPhone,
                email: appt.patientEmail,
                // Assuming 'prescription' link or status is part of the appointment data
                prescriptionLink: appt.prescriptionLink || '#'
            };
            
            // Call createPatientRow to generate a table row for the appointment
            const row = createPatientRow(patient);
            
            // Append each row to the table body
            patientTableBody.appendChild(row);
        });

    } catch (error) {
        // Step 5: Catch and handle any errors during fetch:
        console.error("Error loading appointments:", error);
        // Show a message row: "Error loading appointments. Try again later."
        patientTableBody.innerHTML = '<tr><td colspan="5" class="noPatientRecord error">Error loading appointments. Try again later.</td></tr>';
    }
}


// --- Event Listeners ---

// Add an 'input' event listener to the search bar
if (searchBar) {
    searchBar.addEventListener('input', () => {
        // Trim and check the input value
        const searchValue = searchBar.value.trim();

        // If not empty, use it as the patientName for filtering
        if (searchValue) {
            patientName = searchValue;
        } else {
            // Else, reset patientName to null
            patientName = null;
        }

        // Reload the appointments list with the updated filter
        loadAppointments();
    });
}


// Add a click listener to the "Today" button
if (todayButton) {
    todayButton.addEventListener('click', () => {
        // Set selectedDate to today's date
        selectedDate = today;
        
        // Update the date picker UI to match
        if (datePicker) {
            datePicker.value = selectedDate;
        }

        // Reload the appointments for today
        loadAppointments();
    });
}


// Add a change event listener to the date picker
if (datePicker) {
    datePicker.addEventListener('change', (event) => {
        // Update selectedDate with the new value
        selectedDate = event.target.value;
        
        // Reload the appointments for that specific date
        loadAppointments();
    });
}


// --- Initialization ---

// When the page is fully loaded (DOMContentLoaded):
document.addEventListener('DOMContentLoaded', () => {
    // Call renderContent() (assumes it sets up the UI layout via render.js)
    if (typeof window.renderContent === 'function') {
        window.renderContent();
    }
    
    // Call loadAppointments() to display today's appointments by default
    loadAppointments();
});