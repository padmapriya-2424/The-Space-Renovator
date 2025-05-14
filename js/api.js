const API_URL = "http://localhost:5000/auth"; // Backend server URL

// Register User
async function registerUser(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    return response.json();
}

// Login User
async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

// Logout User (Remove Token)
function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "login.html"; // Redirect to login page
}

// Check if user is logged in
function getToken() {
    return localStorage.getItem("token");
}
