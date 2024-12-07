let [seconds, minutes, hours, milliseconds] = [0, 0, 0, 0];
let interval = null;
const display = document.querySelector('.display');
const toggleMilliseconds = document.getElementById('toggle-milliseconds');

document.getElementById('start-btn').addEventListener('click', () => {
    if (interval) clearInterval(interval);
    interval = setInterval(updateStopwatch, 10);  // Update every 10ms
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(interval);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    [seconds, minutes, hours, milliseconds] = [0, 0, 0, 0];
    updateDisplay();
    clearInterval(interval);
});

toggleMilliseconds.addEventListener('change', () => {
    updateDisplay();  // Update the display to show/hide milliseconds
});

function updateStopwatch() {
    milliseconds++;
    if (milliseconds == 100) {  // 100 milliseconds = 1 second
        milliseconds = 0;
        seconds++;
    }

    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    updateDisplay();
}

function updateDisplay() {
    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;
    const ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    if (toggleMilliseconds.checked) {
        // Display milliseconds if the checkbox is checked
        display.textContent = `${h} : ${m} : ${s} : ${ms}`;
    } else {
        // Otherwise, just display hours, minutes, and seconds
        display.textContent = `${h} : ${m} : ${s}`;
    }
}
