document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".form-step");
    const progressBar = document.getElementById("progress");
    const stepsIndicators = document.querySelectorAll(".step");

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === stepIndex);
            stepsIndicators[index].classList.toggle("active", index <= stepIndex);
        });
        progressBar.style.width = ((stepIndex) / (steps.length - 1)) * 100 + "%";
    }

    document.querySelectorAll(".next-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll(".prev-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep);

    document.getElementById("multiStepForm").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Form Submitted Successfully!");
    });

    document.getElementById("buildingType").addEventListener("change", function () {
        document.getElementById("uploadImagesSection").classList.toggle("hidden", this.value !== "renovation");
    });

    document.getElementById("floorPlanOption").addEventListener("change", function () {
        document.getElementById("uploadFloorPlan").classList.toggle("hidden", this.value !== "upload");
        document.getElementById("searchFloorPlan").classList.toggle("hidden", this.value !== "search");
    });
});
