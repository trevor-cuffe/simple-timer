const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const timerCircle = document.querySelector('#timerCircle');

const timerRadius = timerCircle.getAttribute('r');
const timerDiameter = 2 * Math.PI * timerRadius;
timerCircle.style.strokeDasharray = timerDiameter;

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        console.log("timer started");
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        console.log("timer ticked");

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

        //apply color-change at certain intervals:
        if (timerProgress >= .5) {
            timerCircle.style.stroke = "green";
        } else if (timerProgress >= .25) {
            timerCircle.style.stroke = "yellow";
        } else {
            timerCircle.style.stroke = "red";
        }

    },
    onComplete() {
        console.log("timer complete");
    }
});

