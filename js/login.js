const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Password:', password);
    // Basic input validation
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const user = {
        email,
        password,
    };

    try {
        // Show loading state (optional)
        const loginButton = document.querySelector('.login-btn');
        loginButton.disabled = true; // Disable the button to prevent multiple submissions

        // Send the login request to the backend
        const response = await fetch('http://localhost:5000/api/users/login', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Check if the response is okay
        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Success message

            // Store the JWT token and login status in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email); // Assuming email is used as the username
            localStorage.setItem("loggedIn", true); // Set loggedIn status to true

            // Update UI to show profile and hide login/signup buttons
            const profileIcon = document.getElementById("profile-icon");
            const loginBtn = document.getElementById("login-btn");
            const signupBtn = document.getElementById("signup-btn");
            const username = document.getElementById("username");

            if (profileIcon && loginBtn && signupBtn && username) {
                profileIcon.style.display = "block";
                loginBtn.style.display = "none";
                signupBtn.style.display = "none";
                username.innerText = email; // Set the username dynamically
            } else {
                console.error('UI elements missing or not loaded correctly');
            }

            // Redirect the user to the home page (or whatever page you prefer)
            window.location.href = '/index.html/home.html'; 
        } else {
            // If the status is not OK (e.g., 400, 401, etc.), show the error message
            const result = await response.json();
            console.error(result);  // Log the entire response for debugging
            alert(result.msg || "Something went wrong!");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    } finally {
        // Re-enable the login button after the request is done
        const loginButton = document.querySelector('.login-btn');
        loginButton.disabled = false;
    }
};

// Resend verification function
const resendVerification = async () => {
    const email = document.getElementById('email').value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/resend-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to resend verification email.');
    }
};
