const durationInput = document.querySelector('#duration');
const startStopButton = document.querySelector('#start-stop');
const resetButton = document.querySelector('#reset');
const timerCircle = document.querySelector('#timerCircle');

const timerRadius = timerCircle.getAttribute('r');
const timerDiameter = 2 * Math.PI * timerRadius;
timerCircle.style.strokeDasharray = timerDiameter;

let duration;

const timer = new Timer(durationInput, startStopButton, resetButton, {
    onStart(totalDuration) {
        duration = totalDuration;
        setStartButtonIcon(true);
    },
    onPause() {
        setStartButtonIcon(false);
    },
    onTick(timeRemaining) {

        //check to make sure duration is defined and non-zero
        if(!duration) return;

        //--- Calculate Timer Progress ---//
        //progress as a percentage
        const timerProgress = timeRemaining / duration;
        //start at full and shrink down
        const timerPosition = -1 * timerDiameter * (1 - timerProgress);

        //--- Apply Styles to Timer Display ---//
        //apply the calculated timer progress
        timerCircle.style.strokeDashoffset = timerPosition;

        setTimerColor(timerProgress);

    },
    onReset() {
        timerCircle.style.strokeDashoffset = 0;
        setTimerColor(1);
    },
    onComplete() {
    },
    onError(error) {
        switch (error) {
            case 1:
                alert("Timer input must be a number greater than zero");
                break;
        }
    }
});

function setStartButtonIcon(isRunning) {
    if (isRunning) {
        startStopButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        startStopButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function setTimerColor(progress) {
    //apply color-change at certain intervals:
    if (progress >= .5) {
        timerCircle.style.stroke = "green";
    } else if (progress >= .25) {
        timerCircle.style.stroke = "yellow";
    } else {
        timerCircle.style.stroke = "red";
    }
}

