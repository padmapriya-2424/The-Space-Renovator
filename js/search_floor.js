// Mock data for search results (can be replaced with real data)
const floorPlans = [
    { name: 'Skyline Tower', address: '123 Main St, City Center' },
    { name: 'Sunset Heights', address: '456 Oak Ave, Green Park' },
    { name: 'River View Apartments', address: '789 Water Blvd, Riverside' },
];

// Search function to find floor plans by name or address
function searchFloorPlan() {
    let searchInput = document.getElementById("search-floor-plan").value.trim();
    let resultsContainer = document.getElementById("results-container");

    if (searchInput.length < 3) {
        alert("Please enter at least 3 characters.");
        return;
    }

    // Replace mock data with real API fetch call if needed
    const results = floorPlans.filter(plan =>
        plan.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        plan.address.toLowerCase().includes(searchInput.toLowerCase())
    );

    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No floor plans found matching your criteria.</p>";
    } else {
        results.forEach(result => {
            let div = document.createElement("div");
            div.classList.add("result-card");
            div.innerHTML = `<h3>${result.name}</h3><p>${result.address}</p>`;
            resultsContainer.appendChild(div);
        });
    }

    // Show the results section and next button
    document.getElementById("search-result").classList.remove("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// Proceed to the next step
function goNext() {
    window.location.href = "room_selection.html"; // Update with real file
}
