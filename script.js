// ---- Timer variables ----
let startTime = null;
let timePassed = 0;
let timerRunning = false;
let timerInterval = null;

// ---- Session log ----
let sessions = [];

// ---- DOM elements ----
const display = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const stopBtn  = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn  = document.getElementById("saveBtn");
const subjectInput = document.getElementById("subjectInput");
const sessionList  = document.getElementById("sessionList");
const totalTimeEl  = document.getElementById("totalTime");
const clearLogBtn  = document.getElementById("clearLog");

// ---- Update the timer display ----
function updateDisplay() {
    let total = Math.floor(timePassed / 1000);
    let h = Math.floor(total / 3600);
    let m = Math.floor((total % 3600) / 60);
    let s = total % 60;

    let hStr = String(h).padStart(2, "0");
    let mStr = String(m).padStart(2, "0");
    let sStr = String(s).padStart(2, "0");

    display.textContent = hStr + ":" + mStr + ":" + sStr;
}

// ---- Start ----
function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    startTime = Date.now() - timePassed;
    timerInterval = setInterval(function() {
        timePassed = Date.now() - startTime;
        updateDisplay();
    }, 500);
}

// ---- Pause ----
function stopTimer() {
    if (!timerRunning) return;
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
}

// ---- Reset ----
function resetTimer() {
    stopTimer();
    timePassed = 0;
    updateDisplay();
}

// ---- Save session ----
function saveSession() {
    if (timePassed < 1000) {
        alert("Timer hasn't started yet!");
        return;
    }

    let subject = subjectInput.value.trim();
    if (subject === "") {
        subject = "General Study";
    }

    let total = Math.floor(timePassed / 1000);
    let h = Math.floor(total / 3600);
    let m = Math.floor((total % 3600) / 60);
    let s = total % 60;

    let timeStr = "";
    if (h > 0) timeStr += h + "h ";
    if (m > 0) timeStr += m + "m ";
    timeStr += s + "s";

    let now = new Date();
    let timeLabel = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

    sessions.push({
        subject: subject,
        duration: timePassed,
        timeStr: timeStr,
        savedAt: timeLabel
    });

    renderSessionList();
    resetTimer();
    subjectInput.value = "";
}

// ---- Render the session list ----
function renderSessionList() {
    sessionList.innerHTML = "";

    if (sessions.length === 0) {
        sessionList.innerHTML = "<li style='color:#999; font-size:13px;'>No sessions saved yet.</li>";
        totalTimeEl.textContent = "0h 0m";
        return;
    }

    let totalMs = 0;

    for (let i = 0; i < sessions.length; i++) {
        let s = sessions[i];
        totalMs += s.duration;

        let li = document.createElement("li");
        li.innerHTML = 
            "<span class='session-subject'>" + s.subject + "</span>" +
            "<span class='session-time'>" + s.timeStr + " — saved at " + s.savedAt + "</span>";
        sessionList.appendChild(li);
    }

    let totalSecs = Math.floor(totalMs / 1000);
    let th = Math.floor(totalSecs / 3600);
    let tm = Math.floor((totalSecs % 3600) / 60);
    totalTimeEl.textContent = th + "h " + tm + "m";
}

// ---- Clear log ----
function clearLog() {
    if (sessions.length === 0) return;
    let yes = confirm("Clear all saved sessions?");
    if (yes) {
        sessions = [];
        renderSessionList();
    }
}

// ---- Event listeners ----
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
saveBtn.addEventListener("click", saveSession);
clearLogBtn.addEventListener("click", clearLog);

// ---- Init ----
updateDisplay();
renderSessionList();
