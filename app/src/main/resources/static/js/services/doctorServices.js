
/*
  doctorServices.js: API interaction layer for doctor-related data.
*/

// Import the base API URL from the config file (assuming a standard location)
import { API_BASE_URL } from './config.js';

// Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions
const DOCTOR_API = `${API_BASE_URL}/doctor`;


/**
 * Function: getDoctors
 * Purpose: Fetch the list of all doctors from the API
 * @returns {Promise<Array>} A promise that resolves to an array of doctor objects or an empty array on failure.
 */
export async function getDoctors() {
    try {
        // Use fetch() to send a GET request to the DOCTOR_API endpoint
        const response = await fetch(DOCTOR_API, {
            method: 'GET'
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return [];
        }

        // Convert the response to JSON
        const data = await response.json();
        
        // Return the 'doctors' array from the response (assuming the API returns { doctors: [...] })
        return data.doctors || [];
    } catch (error) {
        // If there's an error (e.g., network issue), log it and return an empty array
        console.error("Error fetching doctors:", error);
        return [];
    }
}


/**
 * Function: deleteDoctor
 * Purpose: Delete a specific doctor using their ID and an authentication token
 * @param {string} doctorId - The ID of the doctor to delete.
 * @param {string} token - The Admin authentication token.
 * @returns {Promise<object>} An object with success status and message.
 */
export async function deleteDoctor(doctorId, token) {
    try {
        // Use fetch() with the DELETE method
        // The URL includes the doctor ID and token as path parameters (assuming API structure)
        const response = await fetch(`${DOCTOR_API}/${doctorId}/${token}`, {
            method: 'DELETE'
        });

        // Convert the response to JSON
        const data = await response.json();
        
        if (!response.ok) {
            // Throw an error if the server response indicates failure
            throw new Error(data.message || 'Failed to delete doctor on the server.');
        }

        // Return an object with success status and message from the server
        return { 
            success: true, 
            message: data.message || `Doctor ${doctorId} successfully deleted.` 
        };

    } catch (error) {
        // If an error occurs, log it and return a default failure response
        console.error("Error deleting doctor:", error);
        return { 
            success: false, 
            message: error.message || "Network error or failed to connect to the server." 
        };
    }
}


/**
 * Function: saveDoctor
 * Purpose: Save (create) a new doctor using a POST request
 * @param {object} doctorData - The data object for the new doctor.
 * @param {string} token - The Admin authentication token.
 * @returns {Promise<object>} An object with success status and message.
 */
export async function saveDoctor(doctorData, token) {
    try {
        // Use fetch() with the POST method
        // URL includes the token in the path (assuming API structure: /doctor/save/{token})
        const response = await fetch(`${DOCTOR_API}/save/${token}`, {
            method: 'POST',
            // Set headers to specify JSON content type
            headers: {
                'Content-Type': 'application/json'
            },
            // Convert the doctor object to JSON in the request body
            body: JSON.stringify(doctorData)
        });

        const data = await response.json();

        if (!response.ok) {
            // Throw an error if the server response indicates failure
            throw new Error(data.message || 'Failed to save doctor.');
        }

        // Parse the JSON response and return success/message
        return { 
            success: true, 
            message: data.message || "Doctor successfully created." 
        };

    } catch (error) {
        // Catch and log errors
        console.error("Error saving doctor:", error);
        // Return a failure response if an error occurs
        return { 
            success: false, 
            message: error.message || "Network error or failed to save doctor." 
        };
    }
}


/**
 * Function: filterDoctors
 * Purpose: Fetch doctors based on filtering criteria (name, time, and specialty)
 * @param {string} name - Doctor name/ID search term.
 * @param {string} time - Time filter (e.g., AM, PM).
 * @param {string} specialty - Medical specialization.
 * @returns {Promise<object>} An object containing the filtered doctor array and a status.
 */
export async function filterDoctors(name, time, specialty) {
    try {
        // Encode parameters and construct the filter URL (assuming API structure: /doctor/filter/{name}/{time}/{specialty})
        const nameParam = encodeURIComponent(name || 'all');
        const timeParam = encodeURIComponent(time || 'all');
        const specialtyParam = encodeURIComponent(specialty || 'all');
        
        const filterURL = `${DOCTOR_API}/filter/${nameParam}/${timeParam}/${specialtyParam}`;

        // Use fetch() with the GET method
        const response = await fetch(filterURL, {
            method: 'GET'
        });

        // Check if the response is OK
        if (response.ok) {
            const data = await response.json();
            // If yes, parse and return the doctor data
            return { 
                doctors: data.doctors || [], 
                success: true 
            };
        } else {
            // If no, log the error and return an object with an empty 'doctors' array
            const errorData = await response.json();
            console.error(`Error filtering doctors. Status: ${response.status}. Message: ${errorData.message}`);
            return { 
                doctors: [], 
                success: false, 
                message: errorData.message 
            };
        }

    } catch (error) {
        // Catch any other errors, alert the user, and return a default empty result
        console.error("Network error during doctor filtering:", error);
        alert("A network error occurred while trying to filter doctors.");
        return { 
            doctors: [], 
            success: false, 
            message: "Failed to connect to the server." 
        };
    }
}