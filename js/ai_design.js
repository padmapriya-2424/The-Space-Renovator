document.addEventListener("DOMContentLoaded", function () {
    const selectedRoom = localStorage.getItem("selectedRoom");
    if (!selectedRoom) {
        alert("No room selected! Redirecting back...");
        window.location.href = "floor_plan.html";
        return;
    }

    console.log("🎨 Displaying AI Design for:", selectedRoom);
    document.getElementById("selected-room-text").innerText = `Design for: ${selectedRoom}`;

    // Map room types to their respective design images
    const roomDesigns = {
        "Bedroom 2": "/assets/bedroom.png",
        "Bedroom": "/assets/bedroom.png",
        "Bedroom 1": "/assets/bedroom.png",
        "Kitchen": "/assets/kitchen.png",
        "Living Room": "/assets/living_room.png",
        "Study": "/assets/study.png",
        "Bathroom": "/assets/bathroom.png"
    };
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("view-in-ar").addEventListener("click", function () {
            const selectedRoom = localStorage.getItem("selectedRoom");
            
            if (!selectedRoom) {
                alert("No room selected for AR view!");
                return;
            }
    
            // 🚀 Redirect to AR viewer page with the selected room type
            window.location.href = `ar_view.html?room=${selectedRoom}`;
        });
    });
    

    // Set the appropriate room design image
    const roomDesignElement = document.getElementById("room-design");
    if (roomDesigns[selectedRoom]) {
        roomDesignElement.src = roomDesigns[selectedRoom];
    } else {
        console.error("❌ No design found for:", selectedRoom);
        roomDesignElement.alt = "Design Not Available";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const saveDesignButton = document.getElementById("saveDesign");

    if (saveDesignButton) {
        saveDesignButton.addEventListener("click", function () {
            // Redirect to the details screen
            window.location.href = "details.html"; // Update the path if needed
        });
    }
});
