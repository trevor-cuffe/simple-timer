class Timer {
    //pass in DOM elements
    constructor(durationInput, startStopButton, resetButton, callbacks) {
        this.durationInput = durationInput;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;

        //default start value
        //timeRemaining is a getter/setter for _timeRemaining
        this.timeStart = 30
        this.timeRemaining = this.timeStart;
        this.isRunning = false;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onPause = callbacks.onPause;
            this.onTick = callbacks.onTick;
            this.onReset = callbacks.onReset;
            this.onComplete = callbacks.onComplete;
            this.sendErrorMessage = callbacks.onError;
            
            //Error Message Values:
            //1 - timer input was not a number
        }

        this.startStopButton.addEventListener('click', this.toggleRunning);
        this.resetButton.addEventListener('click', this.reset);
    }

    toggleRunning = () => {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    start = () => {
        //====== GUARDS ======//

        // if the timer is already going, do nothing
        if (this.interval) return;

        // if there's an error getting the time from the user input,
        // send error message
        if (!this.getTime()) {
            this.sendErrorMessage(1);
            return;
        }

        //====================//

        this.isRunning = true;

        //send started event if available
        if(this.onStart) this.onStart(this.timeStart);

        this.tick();
        //time in ms - should be 1000 * the decrement value in this.tick()
        this.interval = setInterval(this.tick, 10); 
    }
    
    pause = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.isRunning = false;
        if(this.onPause) this.onPause();
    }

    tick = () => {
        if (this.timeRemaining <= 0 ) {
            //stop when the timer reaches zero
            this.pause();
            if (this.onComplete) this.onComplete();
        } else {
            //should be 1/1000 the interval time in this.start()
            this.timeRemaining -= 0.01; 
            if (this.onTick) this.onTick(this.timeRemaining);
        }
    }

    reset = () => {
        this.pause();
        this.timeRemaining = this.timeStart;
        if(this.onReset) this.onReset();
    }
    
    // get time from user interface for new timer
    getTime = () => {
        const input = durationInput.value;
        
        //====== GUARDS ======//
        
        // if no input - default to 0
        if(!input) {
            this.timeRemaining = 0;
            return true;
        }
        
        // If input is not a number, or is a negative number, return false
        // this will trigger the provided onError method
        if (!Number(input) || Number(input) < 0) {
            return false;
        }
        
        //====================//

        // Check if the input value is different than the time remaining
        if (Number(input).toFixed(2) !== this.timeRemaining) {
            //if they are different, the timer has been updated by the user, and should have a new start time
            this.timeStart = Number(input);
            this.timeRemaining = this.timeStart;
        }

        // if times are the same, the timer is already in sync, and no further action is necessary.

        // in either case, return true
        return true;

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