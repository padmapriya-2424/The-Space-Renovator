// Function to handle button selection and update styles
function selectOption(type) {
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelector(`[onclick="selectOption('${type}')"]`).classList.add("selected");

    // Show next section
    document.getElementById("user-type-section").classList.remove("hidden");
}

// Function to handle user type selection
function selectUser(user) {
    document.querySelectorAll(".user-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelector(`[onclick="selectUser('${user}')"]`).classList.add("selected");

    // Show floor plan input section
    document.getElementById("input-section").classList.remove("hidden");
}

// Function to handle floor plan selection
let selectedOption = ""; // Store selected input type

function uploadFloorPlan() {
    document.querySelectorAll(".input-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelector(`[onclick="uploadFloorPlan()"]`).classList.add("selected");

    selectedOption = "upload"; // Set selected option

    // Show next button
    document.getElementById("next-btn").classList.remove("hidden");
}

function searchFloorPlan() {
    document.querySelectorAll(".input-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelector(`[onclick="searchFloorPlan()"]`).classList.add("selected");

    selectedOption = "search"; // Set selected option

    // Show next button
    document.getElementById("next-btn").classList.remove("hidden");
}

// Function for Next Button Click
// Function for Next Button Click (Updated)
async function goNext() {
    const projectType = document.querySelector(".option-btn.selected")?.innerText;
    const userType = document.querySelector(".user-btn.selected")?.innerText;
    const floorPlanType = selectedOption === "upload" ? "Upload Floor Plan" : "Search Floor Plan";

    if (!projectType || !userType || !selectedOption) {
        alert("Please complete all selections before proceeding.");
        return;
    }

    // Send data to backend
    try {
        const response = await fetch("http://localhost:5000/api/projects/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectType, userType, floorPlanType })
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Project stored:", data);
            // Redirect user after storing project
            window.location.href = selectedOption === "upload" ? "/index.html/upload_floor.html" : "/index.html/search_floor.html";
        } else {
            alert("Error creating project: " + data.error);
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("Server Error. Try again later.");
    }
}

