import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';
const ADMIN_API = `${API_BASE_URL}/admin`;
const DOCTOR_API = `${API_BASE_URL}/doctor/login`;

window.onload = () => {
    // Select the role buttons
    const adminBtn = document.getElementById("admin-btn");
    const patientBtn = document.getElementById("patient-btn");
    const doctorBtn = document.getElementById("doctor-btn");

    // Helper function used by the onclick handlers defined in index.html
    window.selectRole = (role) => {
        localStorage.setItem("userRole", role);
        if (adminBtn) {
            // adminBtn.addEventListener("click", () => openModal('adminLogin'));
        } else if (doctorBtn) {
            // doctorBtn.addEventListener("click", () => openModal('doctorLogin'));
        } else if (patientBtn) {
            // For Patient, directly navigate to the dashboard or an entry page
            window.location.href = "/pages/patientDashboard.html";
        }
    }
};

window.adminLoginHandler = async () => {
    try {
        // Step 1: Get the entered username and password from the input fields
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        // Step 2: Create an admin object with these credentials
        const admin = { username, password };

        // Step 3: Use fetch() to send a POST request to the ADMIN_API endpoint
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Convert the admin object to JSON and send in the body
            body: JSON.stringify(admin)
        });

        // Step 4: If the response is successful:
        if (response.ok) {
            // Parse the JSON response to get the token
            const data = await response.json();
            const token = data.token;

            // Store the token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", "admin"); // Ensure role is set for the header

            // Proceed to admin-specific dashboard
            window.location.href = "/pages/adminDashboard.html"; 

        } else {
            // Step 5: If login fails or credentials are invalid:
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message || 'Invalid username or password.'}`);
        }

    } catch (error) {
        // Step 6: Wrap everything in a try-catch to handle network or server errors
        console.error("Admin login error:", error);
        alert("An error occurred during login. Please try again later.");
    }
};

window.doctorLoginHandler = async () => {
    try {
        // Step 1: Get the entered email and password from the input fields
        const email = document.getElementById('doctor-email').value;
        const password = document.getElementById('doctor-password').value;

        // Step 2: Create a doctor object with these credentials
        const doctor = { email, password };

        // Step 3: Use fetch() to send a POST request to the DOCTOR_API endpoint
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Include headers and request body similar to admin login
            body: JSON.stringify(doctor)
        });

        // Step 4: If login is successful:
        if (response.ok) {
            // Parse the JSON response to get the token
            const data = await response.json();
            const token = data.token;

            // Store the token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", "doctor");

            // Proceed to doctor-specific dashboard
            window.location.href = "/pages/doctorDashboard.html";

        } else {
            // Step 5: If login fails:
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message || 'Invalid email or password.'}`);
        }

    } catch (error) {
        // Step 6: Wrap in a try-catch block to handle errors gracefully
        console.error("Doctor login error:", error);
        // Show a generic error message
        alert("An error occurred during login. Please check your network connection.");
    }
};
