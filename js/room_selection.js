document.addEventListener("DOMContentLoaded", function () {
    const rooms = document.querySelectorAll(".room");

    rooms.forEach(room => {
        room.addEventListener("click", function () {
            const selectedRoom = this.getAttribute("data-room"); 
            if (!selectedRoom) {
                alert("Error: No room data found!");
                return;
            }

            localStorage.setItem("selectedRoom", selectedRoom);
            console.log("Room Selected:", selectedRoom); // Debugging
            window.location.href = 'ai_input.html';
        });
    });
});
