const durationInput = document.querySelector('#duration');
const startStopButton = document.querySelector('#start-stop');
const resetButton = document.querySelector('#reset');
const timerCircle = document.querySelector('#timerCircle');

const timerRadius = timerCircle.getAttribute('r');
const timerDiameter = 2 * Math.PI * timerRadius;
timerCircle.style.strokeDasharray = timerDiameter;

let duration;

// initialize timer
const timer = new Timer(durationInput, startStopButton, resetButton, {
    onStart(totalDuration) {
        duration = totalDuration;
        setStartButtonIcon(true);
    },
    onPause() {
        setStartButtonIcon(false);
    },
    onTick(timeRemaining) {
        // ===========================================================//
        // Input value should already be updated from the timer class.
        // This method is only responsible for updating styles
        // ===========================================================//


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
        //apply color
        setTimerColor(timerProgress);

    },
    onReset() {
        resetTimerDisplay();
    },
    onComplete() {
        resetTimerDisplay();
    },
    onError(error) {
        switch (error) {
            case 1:
                alert("Timer input must be a number greater than zero");
                break;
        }
    }
});


//=========================//
//======== METHODS ========//
//=========================//

function setStartButtonIcon(isRunning) {
    if (isRunning) {
        startStopButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        startStopButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function setTimerColor(progress) {
    console.log(progress);
    // fade color-change through yellow and red
    // Green until 70%
    // Yellow at 40%
    // Red at 10%

    // green  = rgb(  0, 128, 0)
    // yellow = rgb(255, 228, 0)
    // red    = rgb(255,   0, 0)

    // RED CALCULATION:
    // starting at 70%, add red over 30% of the duration (1/3.33) 
    let red =
        0
        + 255 * Math.min(1, (progress < 0.7) * (0.7 - progress) * 3.33);
    
    // GREEN CALCULATION:
    // starting at 70%, increase to 255 over 30% of the duration (1/3.33)
    // starting at 40%, reduce to 0 over 30% of the duration (1/3.33)
    let green =
        128
        + 100 * Math.min(1, (progress < 0.7) * (0.7 - progress) * 3.33)
        - 228 * Math.min(1, (progress < 0.4 ) * (0.4 - progress) * 3.33);

    if (progress <= 0) {
        timerCircle.style.stroke = 'rgb(180, 180, 180)';
    } else {
        timerCircle.style.stroke = `rgb(${red}, ${green}, 0)`;
    }

   
   
    // //apply color-change at certain intervals:
    // if (progress >= .5) {
    //     timerCircle.style.stroke = "green";
    // } else if (progress >= .25) {
    //     timerCircle.style.stroke = "yellow";
    // } else {
    //     timerCircle.style.stroke = "red";
    // }
}

function resetTimerDisplay() {
    timerCircle.style.strokeDashoffset = 0;
    setTimerColor(0);
}


//Next Step:
//Allow user to escape timer input and return to previous value
//Add option for ticking sound