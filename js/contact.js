document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents actual form submission
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const query = document.getElementById("query").value.trim();

        if (name === "" || email === "" || query === "") {
            alert("Please fill out all fields.");
            return;
        }

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        alert("Your query has been submitted successfully! ✅");
        form.reset(); // Clears form after submission
    });
});
