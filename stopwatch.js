let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('pauseButton').addEventListener('click', pause);
document.getElementById('resetButton').addEventListener('click', reset);
document.getElementById('lapButton').addEventListener('click', recordLap);

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    toggleButtons(['startButton', 'lapButton'], ['pauseButton', 'resetButton']);
}

function pause() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    toggleButtons(['pauseButton', 'resetButton'], ['startButton', 'lapButton']);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    toggleButtons(['pauseButton', 'resetButton'], ['startButton']);
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function recordLap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsContainer.appendChild(li);
}

function toggleButtons(hideBtnIds, showBtnIds) {
    hideBtnIds.forEach(id => document.getElementById(id).style.display = 'none');
    showBtnIds.forEach(id => document.getElementById(id).style.display = 'inline');
}
