/*
  Step-by-Step Explanation of Header Section Rendering
*/

// 1. Define the `renderHeader` Function
function renderHeader() {
    // 2. Select the Header Div
    const headerDiv = document.getElementById("header");

    if (!headerDiv) return;

    // 3. Check if the Current Page is the Root Page
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        headerDiv.innerHTML = `
            <header class="header">
              <div class="logo-section">
                <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
                <span class="logo-title">Hospital CMS</span>
              </div>
            </header>`;
        return;
    }

    // 4. Retrieve the User's Role and Token from LocalStorage
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // 5. Initialize Header Content
    let headerContent = `
        <header class="header">
           <div class="logo-section">
             <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
             <span class="logo-title">Hospital CMS</span>
           </div>
           <nav class="header-nav">`; // Using <nav> and header-nav class for better structure

    // 6. Handle Session Expiry or Invalid Login
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    // 7. Add Role-Specific Header Content
    if (role === "admin") {
        headerContent += `
            <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
            <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "doctor") {
        headerContent += `
            <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
            <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "patient") {
        headerContent += `
            <button id="patientLogin" class="adminBtn">Login</button>
            <button id="patientSignup" class="adminBtn">Sign Up</button>`;
    } else if (role === "loggedPatient") {
        headerContent += `
            <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
            <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
            <a href="#" onclick="logoutPatient()">Logout</a>`;
    }

    // 9. Close the Header Section
    headerContent += `</nav></header>`;


    // 10. Render the Header Content
    headerDiv.innerHTML = headerContent;

    // 11. Attach Event Listeners to Header Buttons
    attachHeaderButtonListeners();
}


// 13. attachHeaderButtonListeners: Adds event listeners to login buttons
function attachHeaderButtonListeners() {
    const patientLoginBtn = document.getElementById("patientLogin");
    const patientSignupBtn = document.getElementById("patientSignup");

    if (patientLoginBtn) {
        patientLoginBtn.addEventListener("click", () => {
            // Assuming openModal is defined elsewhere (e.g., util.js)
            if (typeof openModal === 'function') {
                openModal('patientLogin');
            } else {
                console.error("openModal function not found.");
            }
        });
    }

    if (patientSignupBtn) {
        patientSignupBtn.addEventListener("click", () => {
            // Assuming openModal is defined elsewhere
            if (typeof openModal === 'function') {
                openModal('patientSignup');
            } else {
                console.error("openModal function not found.");
            }
        });
    }
}


// 14. logout: Removes user session data and redirects
function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    // Optionally remove other role-specific data like doctorID, adminID, etc.
    alert("Logged out successfully.");
    window.location.href = "/";
}

// 15. logoutPatient: Removes the patient's session token and redirects
function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient"); // Revert role to unlogged patient
    alert("Logged out successfully.");
    window.location.href = "/pages/patientDashboard.html"; // Redirect to a generic patient landing page
}

// 16. Render the Header
renderHeader();