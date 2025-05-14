// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "/index.html/login.html"; // Replace with your login page path
}

// Function to redirect to the signup page
function redirectToSignup() {
    window.location.href = "/index.html/signup.html"; // Replace with your signup page path
}

// Function to show profile details when clicking the profile icon
function viewProfile() {
    window.location.href = "/index.html/profile.html"; // Replace with your profile page path
}

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn) {
        document.getElementById("profile-icon").style.display = "block";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("signup-btn").style.display = "none";

        document.querySelector(".personalized-section").style.display = "block";
        document.querySelector(".my-projects").style.display = "block"; // ✅ Ensure projects are visible

        const username = localStorage.getItem("username") || "Guest";
        document.getElementById("username").innerText = username;

        loadUserProjects();
    } else {
        document.querySelector(".personalized-section").style.display = "none";
        document.querySelector(".my-projects").style.display = "none";
    }
});

// ✅ Fix: Ensure `userProjects` is correctly retrieved from localStorage
function loadUserProjects() {
    const projects = JSON.parse(localStorage.getItem("userProjects")) || []; 
    const projectsListDiv = document.getElementById("projects-list");

    // Clear any existing content
    projectsListDiv.innerHTML = "";

    if (projects.length === 0) {
        // Show message when no projects exist
        projectsListDiv.innerHTML = "<p style='color: #888; font-size: 18px;'>Your project list is empty.</p>";
    } else {
        // Show the projects
        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project-item");
            projectDiv.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
            projectsListDiv.appendChild(projectDiv);
        });
    }
}



function startDesign() {
    window.location.href = "/index.html/start_new.html";
}

function startNewProject() {
    window.location.href = "/index.html/start_new.html";
}

function exploreDesigns() {
    window.location.href = "/index.html/explore_design.html";
}

function viewInAR() {
    window.location.href = "index.html/3d.html";
}
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    const isVisible = dropdown.style.display === 'block';

    // Hide the dropdown if it's visible, otherwise show it
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Load profile details on page load
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    
    // Show profile icon and username for logged-in users
    if (isLoggedIn) {
        document.getElementById("profile-icon").style.display = "block";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("signup-btn").style.display = "none";
        
        // Retrieve and display the username and email from localStorage
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");

        document.getElementById("username").innerText = username || "Guest";
        document.getElementById("email").innerText = email || "Not available";
    }
});

// Function to handle logout
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Redirect to the login page
    window.location.href = "/index.html/login.html";
}