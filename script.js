let startTime, updatedTime, difference, interval;
let isRunning = false;
let lapCounter = 0;

// Get display elements
const display = document.getElementById('display');
const lapList = document.getElementById('lap-times');

// Start the stopwatch
document.getElementById('start-btn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1000);
    }
});

// Stop the stopwatch
document.getElementById('stop-btn').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
});

// Reset the stopwatch
document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(interval);
    display.textContent = '00:00:00';
    difference = 0;
    lapCounter = 0;
    lapList.innerHTML = ''; // Clear lap times
    isRunning = false;
});

// Record a lap
document.getElementById('lap-btn').addEventListener('click', () => {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapList.appendChild(lapTime);
    }
});

// Update time function
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Helper function to format time
function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}
