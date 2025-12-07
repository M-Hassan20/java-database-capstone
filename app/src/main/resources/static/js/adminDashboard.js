/*
  adminDashboard.js: Logic for the admin dashboard, including doctor loading, filtering, and adding new doctors.
*/

// Import service functions
import { getDoctors, filterDoctors, saveDoctor } from './doctorServices.js';
// Import component rendering functions
import { createDoctorCard } from './doctorCard.js';
// Import utility functions (assuming openModal is here)
import { openModal, closeModal } from './util.js'; 


// DOM elements
const contentDiv = document.getElementById("content");
const searchBar = document.getElementById("searchBar");
const timeFilter = document.getElementById("timeFilter");
const specialtyFilter = document.getElementById("specialtyFilter");


// Attach a click listener to the "Add Doctor" button
window.onload = () => {
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        // When clicked, it opens a modal form using openModal('addDoctor')
        addDocBtn.addEventListener('click', () => {
            openModal('addDoctor');
        });
    }

    // When the DOM is fully loaded:
    // Call loadDoctorCards() to fetch and display all doctors
    loadDoctorCards();

    // Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
    if (searchBar) {
        searchBar.addEventListener('input', filterDoctorsOnChange);
    }
    if (timeFilter) {
        timeFilter.addEventListener('change', filterDoctorsOnChange);
    }
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterDoctorsOnChange);
    }
};


/**
 * Function: loadDoctorCards
 * Purpose: Fetch all doctors and display them as cards
 */
async function loadDoctorCards() {
    try {
        // Call getDoctors() from the service layer
        const doctors = await getDoctors();
        
        if (doctors.length === 0) {
            contentDiv.innerHTML = '<p class="noPatientRecord">No doctors currently registered.</p>';
        } else {
            // Render them using the helper function
            renderDoctorCards(doctors);
        }

    } catch (error) {
        // Handle any fetch errors by logging them
        console.error("Error loading doctor cards:", error);
        contentDiv.innerHTML = '<p class="noPatientRecord error">Failed to load doctor data. Please check the network connection.</p>';
    }
}


/**
 * Function: filterDoctorsOnChange
 * Purpose: Filter doctors based on name, available time, and specialty
 */
async function filterDoctorsOnChange() {
    // Read values from the search bar and filters
    const name = searchBar.value.trim();
    const time = timeFilter.value;
    const specialty = specialtyFilter.value;

    // Normalize empty values to null (or empty string, depending on API requirement)
    const filterName = name || '';
    const filterTime = time || '';
    const filterSpecialty = specialty || '';
    
    try {
        // Call filterDoctors(name, time, specialty) from the service
        const result = await filterDoctors(filterName, filterTime, filterSpecialty);

        if (result.success) {
            const doctors = result.doctors;

            if (doctors.length > 0) {
                // If doctors are found: Render them using createDoctorCard()
                renderDoctorCards(doctors);
            } else {
                // If no doctors match the filter: Show a message
                contentDiv.innerHTML = '<p class="noPatientRecord">No doctors found with the given filters.</p>';
            }
        } else {
             // Handle API error during filtering
             alert(`Error filtering doctors: ${result.message}`);
             contentDiv.innerHTML = `<p class="noPatientRecord error">Error: ${result.message}</p>`;
        }

    } catch (error) {
        // Catch and display any errors with an alert
        console.error("Error during filtering:", error);
        alert("An unexpected error occurred while filtering. Please try again.");
    }
}


/**
 * Function: renderDoctorCards
 * Purpose: A helper function to render a list of doctors passed to it
 * @param {Array} doctors - Array of doctor objects.
 */
function renderDoctorCards(doctors) {
    // Clear the content area
    contentDiv.innerHTML = '';

    // Loop through the doctors and append each card to the content area
    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}


/**
 * Function: adminAddDoctor
 * Purpose: Collect form data and add a new doctor to the system
 * This function must be globally accessible (defined on the window object)
 */
window.adminAddDoctor = async () => {
    // Collect input values from the modal form
    const name = document.getElementById('add-name').value;
    const email = document.getElementById('add-email').value;
    const phone = document.getElementById('add-phone').value;
    const password = document.getElementById('add-password').value;
    const specialty = document.getElementById('add-specialty').value;
    // Assuming availableTimes is a comma-separated string from a single input
    const availableTimesStr = document.getElementById('add-times').value;
    const availableTimes = availableTimesStr.split(',').map(t => t.trim()); 

    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem("token");

    // If no token is found, show an alert and stop execution
    if (!token) {
        alert("Authorization failed. Please log in as an administrator.");
        return;
    }

    // Build a doctor object with the form values
    const doctor = {
        name,
        email,
        phone,
        password,
        specialty,
        availableTimes
    };

    try {
        // Call saveDoctor(doctor, token) from the service
        const result = await saveDoctor(doctor, token);

        if (result.success) {
            // If save is successful:
            alert(`Success! ${result.message}`);
            // Close the modal
            closeModal();
            // Reload the page to show the new doctor
            loadDoctorCards(); 
        } else {
            // If saving fails, show an error message
            alert(`Failed to add doctor: ${result.message}`);
        }
    } catch (error) {
        console.error("Error adding new doctor:", error);
        alert("An unexpected error occurred while adding the doctor.");
    }
};