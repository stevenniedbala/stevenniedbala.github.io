document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Directly hide the loading screen after a delay to test functionality
    setTimeout(() => {
        console.log("Timeout reached, hiding loading screen.");
        loadingScreen.style.display = 'none';
    }, 5000); // Adjust time as necessary
});