let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let interval = null;
const display = document.querySelector('.display');
const logList = document.getElementById('log-list');
const logContainer = document.getElementById('log-container');
const toggleMilliseconds = document.getElementById('toggle-milliseconds');
const quotes = [
    "The best way to predict your future is to create it.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Don’t stop until you’re proud.",
    "Small progress is still progress.",
    "The secret of getting ahead is getting started.",
    "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
    "Dream big, work hard, stay focused, and surround yourself with good people.",
    "Education is the most powerful weapon which you can use to change the world.",
    "The expert in anything was once a beginner.",
    "Push yourself, because no one else is going to do it for you.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Motivation gets you started. Habit keeps you going.",
    "Study while others are sleeping, work while others are loafing, prepare while others are playing, and dream while others are wishing.",
    "A little progress each day adds up to big results.",
    "Your future is created by what you do today, not tomorrow.",
    "Work hard in silence. Let your success be your noise.",
    "Mistakes are proof that you are trying.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Set goals, stay quiet about them, smash them, and clap for your damn self.",
    "Success is the sum of small efforts repeated day in and day out.",
    "It’s not about having time, it’s about making time.",
    "Learning is not attained by chance, it must be sought for with ardor and diligence.",
    "Strive for progress, not perfection.",
    "You are capable of amazing things.",
    "Wake up with determination. Go to bed with satisfaction.",
    "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Every accomplishment starts with the decision to try.",
    "There are no shortcuts to any place worth going.",
    "Learning is a treasure that will follow its owner everywhere.",
    "Success is no accident. It is hard work, perseverance, learning, studying, and sacrifice.",
    "Stay committed to your decisions, but stay flexible in your approach.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Never stop learning, because life never stops teaching.",
    "Great things never come from comfort zones.",
    "Start where you are. Use what you have. Do what you can.",
    "Discipline is the bridge between goals and accomplishment.",
    "Education is not preparation for life; education is life itself.",
    "If it doesn’t challenge you, it doesn’t change you.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Learn from yesterday, live for today, hope for tomorrow.",
    "Stop making excuses. Start making progress.",
    "You think it's hard now? Wait until you regret not starting.",
    "Someone else is out there studying harder than you. Beat them.",
    "You don’t deserve the results if you don’t put in the work.",
    "Get up. Show up. Stop whining. Start grinding.",
    "The pain of discipline is far less than the pain of regret.",
    "Do you really want to be average? Get back to work.",
    "The dream is free. The grind is not.",
    "Your competition isn’t resting. Why are you?",
    "Prove them wrong. Prove yourself right.",
    "Stop being lazy. No one’s going to study for you.",
    "Excuses don’t get degrees. Action does.",
    "The clock is ticking. What are you doing about it?",
    "Complaining doesn’t bring results. Consistency does.",
    "Do it now, or regret it later. Your choice.",
    "You don’t need motivation; you need discipline.",
    "If not now, then when? If not you, then who?",
    "Quit waiting for the perfect time. It doesn’t exist. Start now.",
    "You said you’d do it yesterday. Do it today.",
    "Tired? Good. Keep going.",
    "You want results? Earn them.",
    "Success isn’t owned. It’s rented. And rent is due every day.",
    "Stop scrolling. Start studying.",
    "You’re not stuck. You’re just not trying hard enough.",
    "The test won’t pass itself. Get to it.",
    "No one said it would be easy. They said it would be worth it.",
    "Want to quit? Then start over and waste even more time.",
    "Stop looking for motivation and start building habits.",
    "Nobody cares. Work harder.",
    "Are you really going to let a piece of paper defeat you?",
    "Comfort won’t get you anywhere. Growth will.",
    "Don’t complain about results you didn’t work for.",
    "Why are you still reading this? Open your books."
];


setInterval(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = randomQuote;
}, 50000);

document.getElementById('start-btn').addEventListener('click', () => {
    if (interval) clearInterval(interval);
    interval = setInterval(updateStopwatch, 10);
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(interval);
    logStudyTime();
    logContainer.style.display = "block";
});

document.getElementById('reset-btn').addEventListener('click', () => {
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    updateDisplay();
    logList.innerHTML = '';
    logContainer.style.display = "none";
    clearInterval(interval);
});

function updateStopwatch() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
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
    updateDisplay();
}

function updateDisplay() {
    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;
    const ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    display.textContent = toggleMilliseconds.checked
        ? `${h} : ${m} : ${s} : ${ms}`
        : `${h} : ${m} : ${s}`;
}

function logStudyTime() {
    const totalMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + (milliseconds * 10);
    let logTime = '';

    if (totalMilliseconds >= 3600000) {
        // More than an hour
        logTime = `${hours} hr ${minutes} min ${seconds} sec`;
    } else if (totalMilliseconds >= 60000) {
        // More than a minute
        logTime = `${minutes} min ${seconds} sec`;
    } else if (totalMilliseconds >= 1000) {
        // More than a second
        logTime = `${seconds} sec ${milliseconds} ms`;
    } else {
        // Less than a second
        logTime = `${milliseconds * 10} ms`;
    }

    const logItem = document.createElement('li');
    logItem.textContent = `Studied for: ${logTime}`;
    logList.appendChild(logItem);
}