function resetPassword() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter your email address');
        return;
    }

    // Create the request body
    const requestBody = {
        email: email
    };

    // Make an API call to request a password reset link
    fetch('http://localhost:5000/api/users/password-reset-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);  // Show success message
            window.location.href = 'index.html/login.html';  // Redirect to login page after successful request
        } else {
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the password reset request. Please try again.');
    });
}
