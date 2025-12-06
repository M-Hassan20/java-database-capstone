/*
  Function to render the footer content into the page
*/

function renderFooter() {
    // Select the footer element from the DOM (assuming the ID is 'footer' as per the HTML instructions)
    const footerDiv = document.getElementById("footer");

    if (!footerDiv) {
        console.error("Footer element with ID 'footer' not found.");
        return;
    }

    // Define the HTML content for the footer
    const footerContent = `
        <footer class="footer">
            <div class="footer-container">
                
                <div class="footer-logo">
                    <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
                    <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
                </div>

                <div class="footer-links">
                    
                    <div class="footer-column">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Careers</a>
                        <a href="#">Press</a>
                    </div>

                    <div class="footer-column">
                        <h4>Support</h4>
                        <a href="#">Account</a>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                    </div>

                    <div class="footer-column">
                        <h4>Legals</h4>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Licensing</a>
                    </div>
                </div>

            </div> </footer> `;

    // 1. Insert Footer HTML Content
    footerDiv.innerHTML = footerContent;
    // 11. Footer Rendering Complete
}


// Call the renderFooter function to populate the footer in the page
renderFooter();