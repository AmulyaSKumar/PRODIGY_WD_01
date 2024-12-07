let [milseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let stopwatch = null;

const display = document.querySelector('.display');
const lapList = document.querySelector('.lap-list');
const themeSwitch = document.querySelector('#theme-switch');
const hideMsCheckbox = document.querySelector('#hide-ms');
const hideHrsCheckbox = document.querySelector('#hide-hrs');

document.querySelector('.start').addEventListener('click', () => {
    if (stopwatch !== null) clearInterval(stopwatch);
    stopwatch = setInterval(startStopwatch, 10);
});

document.querySelector('.pause').addEventListener('click', () => {
    clearInterval(stopwatch);
});

document.querySelector('.reset').addEventListener('click', () => {
    [milseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    display.innerHTML = formatTime();
    lapList.innerHTML = '';
    clearInterval(stopwatch);
});

document.querySelector('.lap').addEventListener('click', () => {
    const lapTime = formatTime();
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
});

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeSwitch.checked);
});

hideMsCheckbox.addEventListener('change', updateDisplay);
hideHrsCheckbox.addEventListener('change', updateDisplay);

function startStopwatch() {
    milseconds++;
    if (milseconds === 100) {
        milseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    display.innerHTML = formatTime();
}

function formatTime() {
    let h = hours < 10 ? `0${hours}` : hours;
    let m = minutes < 10 ? `0${minutes}` : minutes;
    let s = seconds < 10 ? `0${seconds}` : seconds;
    let ms = milseconds < 10 ? `0${milseconds}` : milseconds;

    if (hideHrsCheckbox.checked) h = '';
    if (hideMsCheckbox.checked) ms = '';

    return [h, m, s, ms].filter(Boolean).join(' : ');
}

function updateDisplay() {
    display.innerHTML = formatTime();
}
