// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function() {

    // Handle the progress bar for budget (dynamic value example)
    const progressBar = document.querySelector('.progress-bar');
    const totalBudget = 4000;
    const currentBudget = 3000;
    const budgetPercentage = (currentBudget / totalBudget) * 100;
    progressBar.style.width = `${budgetPercentage}%`;

    // Handle the "Finalize Design" button click
    const finalizeButton = document.querySelector('button');
    finalizeButton.addEventListener('click', function() {
        alert("Design finalized!");
        // Add any additional logic for finalizing the design, like sending data to the server
    });

    // Handle feedback submission
    const feedbackButton = document.getElementById('submit-feedback');
    feedbackButton.addEventListener('click', function() {
        const feedbackText = document.getElementById('feedback').value;
        if (feedbackText.trim() === '') {
            alert("Please provide your feedback.");
        } else {
            alert("Feedback submitted successfully!");
            // Optionally send feedback to a server here
            document.getElementById('feedback').value = ''; // Clear feedback field after submission
        }
    });

    // Handle "Create New Design" button click
    const createNewButton = document.getElementById('create-new');
    createNewButton.addEventListener('click', function() {
        window.location.href = '/index.html/room_selection.html'; // Replace with the URL for starting a new design
    });

    // Handle Download Buttons
    const downloadPdfButton = document.getElementById('download-pdf');
    const download3DButton = document.getElementById('download-3d');
    const downloadFloorPlanButton = document.getElementById('download-floorplan');

    // Download PDF (mock action for now)
    downloadPdfButton.addEventListener('click', function() {
        alert("Downloading PDF...");
        // Implement logic for downloading a PDF file
    });

    // Download 3D Model (mock action for now)
    download3DButton.addEventListener('click', function() {
        alert("Downloading 3D Model...");
        // Implement logic for downloading the 3D model file
    });

    // Download Floor Plan (mock action for now)
    downloadFloorPlanButton.addEventListener('click', function() {
        alert("Downloading Floor Plan...");
        // Implement logic for downloading the floor plan file
    });

});
