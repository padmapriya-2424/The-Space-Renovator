async function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const signUpButton = document.querySelector('.signup-btn');

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    try {
        signUpButton.disabled = true; // Disable the button while submitting

        const response = await fetch('http://localhost:5000/api/users/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Sign Up successful! Check your email to verify your account.');
            window.location.href = 'index.html/login.html';
        } else {
            alert(result.message || "Something went wrong!");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to sign up! Please try again.');
    } finally {
        signUpButton.disabled = false;
    }
}
