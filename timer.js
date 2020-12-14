class Timer {
    //pass in DOM elements
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        //default start value
        //timeRemaining is a getter/setter for _timeRemaining
        this.timeRemaining = 30;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        //if the timer is already going, do nothing
        if (this.interval) return;

        
        this.getTime();

        //send started event if available
        if(this.onStart) this.onStart(this.timeRemaining);

        this.tick();
        this.interval = setInterval(this.tick, 10);
    }
    
    pause = () => {
        clearInterval(this.interval);
        this.interval = null;
    }

    tick = () => {
        if (this.timeRemaining <= 0 ) {
            this.pause();
            if (this.onComplete) this.onComplete();
        } else {
            this.timeRemaining -= 0.01;
            if (this.onTick) this.onTick(this.timeRemaining);
        }
    }
    
    //get time from user interface for new timer
    getTime = () => {
        if(durationInput.value) {
            this.timeRemaining = Number(durationInput.value);
        }
    }

    //===============================//
    //====timeRemaining get/set =====//
    //===============================//

    // use timeRemaining as a sort of shadow variable to access the stored value "_timeRemaining"
    // each time timeRemaining is set, it will update the value of the user input to match
    // also, auto-round to 2 decimal points any time it is being set

    get timeRemaining() {
        return this._timeRemaining;
    }

    set timeRemaining(time) {
        this._timeRemaining = time.toFixed(2);
        durationInput.value = this.timeRemaining;
    }

    //===============================//

}