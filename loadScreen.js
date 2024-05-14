document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loadingScreen');

    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide the loading screen
        console.log("Loading screen hidden after 3 seconds.");
    }, 2500); // 3000 milliseconds = 3 seconds
});
