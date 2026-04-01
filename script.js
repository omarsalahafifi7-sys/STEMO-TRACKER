
let startTime = null;
let timePassed = 0;
let timer = null;
function updateDisplay() {
    const totalseconds = Math.floor(timePassed / 1000);
    const hours = Math.floor(totalseconds / 3600);
    const minutes = Math.floor((totalseconds % 3600) / 60);
    const seconds = totalseconds % 60;
    document.getElementById("time").innerText =
    `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startTimer(){
    if (timer !== null) return;
    startTime = Date.now() - timePassed;
    timer = setInterval(()=> {
        timePassed = Date.now() - startTime;
        updateDisplay();
    }, 250);
}

function stopTimer(){
    clearInterval(timer);
    timer=null 
}

function resetTimer() {
    stopTimer();
    timePassed = 0;
    updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
 document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
});