let floorPlanImage = null;

function handleFileUpload(event) {
    console.log("File input triggered");

    const file = event.target.files[0];
    if (!file) {
        document.getElementById('next-btn').classList.add('hidden');
        return;
    }
    console.log("Selected File:", file);

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image or PDF file.');
        return;
    }

    // Create a FileReader to read the file
    const reader = new FileReader();

    reader.onload = function (e) {
        console.log("File loaded", e.target.result); // Check if the file is being loaded
        const fileURL = e.target.result;

        if (file.type.startsWith('image/')) {  // Only handle image preview
            const imgElement = document.getElementById('floor-plan-preview');
            imgElement.src = fileURL; // Show the uploaded image as a preview

            // Enable the "Next" button after uploading
            document.getElementById('next-btn').classList.remove('hidden');

            // Show the image preview section
            document.getElementById('image-preview-section').classList.remove('hidden');
            document.getElementById('image-preview-section').style.display = "block";
        } else {
            // Handle PDF (optional) - you can show a PDF icon or name instead
            alert('PDF files are currently not supported for image preview.');
        }
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // Store the file in the floorPlanImage variable
    floorPlanImage = file;
}

function goNext() {
    if (!floorPlanImage) {
        alert("Please upload a valid floor plan image before proceeding.");
        return;
    }

    const formData = new FormData();
    formData.append('floorPlan', floorPlanImage);

    fetch('http://localhost:5000/upload-floor-plan', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);

        if (data.success) {
            // Store uploaded filename in localStorage to access it on the next screen
            localStorage.setItem("uploadedFloorPlan", data.filename);

            // Redirect to room selection page
            window.location.href = '/index.html/loader.html';
        } else {
            alert("Error uploading floor plan. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
}

