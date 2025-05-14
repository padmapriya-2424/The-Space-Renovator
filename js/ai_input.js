document.addEventListener("DOMContentLoaded", function () {
    const userTypeSelect = document.getElementById("userType");
    const forms = {
        bachelor: document.getElementById("bachelorForm"),
        family: document.getElementById("familyForm"),
        universalDesign: document.getElementById("universalDesignForm"),
        accessibleDesign: document.getElementById("accessibleDesignForm"),
    };

    function showSelectedForm() {
        // Hide all forms
        Object.values(forms).forEach(form => form.style.display = "none");

        // Get selected value
        const selectedValue = userTypeSelect.value;

        // Show the selected form (if valid)
        if (forms[selectedValue]) {
            forms[selectedValue].style.display = "block";
        }
    }

    // Run function when user selects an option
    userTypeSelect.addEventListener("change", showSelectedForm);

    // Run function on page load (if a selection exists)
    showSelectedForm();
});
