// Toggle login/signup modal visibility
function toggleLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function toggleSignupForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

// Close modal
function closeModal(formId) {
    document.getElementById(formId).style.display = 'none';
}

// Dummy login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // For demo purposes, logging in without validation
    if (username && password) {
        document.getElementById('profile-icon').style.display = 'flex';
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('username').textContent = username;
        closeModal('login-form');
    }
}

// Dummy signup function
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    // For demo purposes, signing up without validation
    if (username && password) {
        alert('Sign-up successful!');
        closeModal('signup-form');
    }
}
