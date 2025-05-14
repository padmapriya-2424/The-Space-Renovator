// In the login.js file
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple mock login validation (replace with actual validation)
    if (email === "user@example.com" && password === "password123") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = '/index.html/userdashboard.html'; // Redirect to a different page after login
    } else {
        alert("Invalid credentials");
    }
}
