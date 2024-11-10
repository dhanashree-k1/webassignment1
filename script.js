// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function () {

    // Select all the form elements and buttons
    const generatePreviewButton = document.getElementById('generate-preview');
    const downloadPdfButton = document.getElementById('download-pdf');
    const resumePreviewContainer = document.getElementById('resume-preview');
    const imageInput = document.getElementById('image');  // Profile image input
    const profileImageElement = document.getElementById('profile-picture');  // Image preview element

    // Function to get all the input values from the form
    function getFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            summary: document.getElementById('summary').value,
            education: document.getElementById('education').value,
            experience: document.getElementById('experience').value,
            skills: document.getElementById('skills').value,
            technologies: document.getElementById('technologies').value,
            projects: document.getElementById('projects').value,
        };
    }

    // Function to preview the uploaded image
    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImageElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to generate a preview of the resume
    function generateResumePreview() {
        const formData = getFormData();

        const previewHtml = `
            <div class="profile-preview">
                <img src="${profileImageElement.src}" alt="Profile Image" class="profile-image-preview">
                <h3>${formData.name}</h3>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Summary:</strong> ${formData.summary}</p>
                <p><strong>Education:</strong> ${formData.education}</p>
                <p><strong>Work Experience:</strong> ${formData.experience}</p>
                <p><strong>Skills:</strong> ${formData.skills}</p>
                <p><strong>Technologies & Tools:</strong> ${formData.technologies}</p>
                <p><strong>Projects:</strong> ${formData.projects}</p>
            </div>
        `;
        
        // Display the preview HTML in the preview container
        resumePreviewContainer.innerHTML = previewHtml;
    }

    // Generate the preview when the "Generate Preview" button is clicked
    generatePreviewButton.addEventListener('click', generateResumePreview);

    // Function to generate a PDF and download it
    function generatePdf() {
        const formData = getFormData();
        
        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set font size for title
        doc.setFontSize(22);
        doc.text(formData.name, 20, 30);

        // Add contact details
        doc.setFontSize(14);
        doc.text(`Email: ${formData.email}`, 20, 40);
        doc.text(`Phone: ${formData.phone}`, 20, 50);

        // Add summary
        doc.text('Summary:', 20, 60);
        doc.text(formData.summary, 20, 70);

        // Add Education
        doc.text('Education:', 20, 90);
        doc.text(formData.education, 20, 100);

        // Add Work Experience
        doc.text('Work Experience:', 20, 120);
        doc.text(formData.experience, 20, 130);

        // Add Skills
        doc.text('Skills:', 20, 150);
        doc.text(formData.skills, 20, 160);

        // Add Technologies & Tools
        doc.text('Technologies & Tools:', 20, 180);
        doc.text(formData.technologies, 20, 190);

        // Add Projects
        doc.text('Projects:', 20, 210);
        doc.text(formData.projects, 20, 220);

        // If an image is uploaded, include it in the PDF
        if (profileImageElement.src !== "profile.jpeg") {
            const img = new Image();
            img.src = profileImageElement.src;
            img.onload = function () {
                doc.addImage(img, 'JPEG', 150, 30, 40, 40);  // Positioning the image
                doc.save('resume.pdf'); // Save the PDF after adding the image
            };
        } else {
            // If no image is uploaded, just generate the PDF without the image
            doc.save('resume.pdf');
        }
    }

    // Download the PDF when the "Download PDF" button is clicked
    downloadPdfButton.addEventListener('click', generatePdf);
});
