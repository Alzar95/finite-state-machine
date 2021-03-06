class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) {
            throw new Error("Error");
        }

        this.state = config.initial;
        this.start = config.initial;
        this.states = config.states;
        this.tmp = config.initial;
        this.tmpTwo = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.state = state;

        this.tmp = this.state;

        if(this.states[this.state].transitions[!state]) {
            throw new Error("Error");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.state = this.states[this.state].transitions[event];
        this.tmpTwo = this.state;
        if(this.states[this.state].transitions[!event]) {
            throw new Error("Error");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.start;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var mas = [], length = 0;
        if(!event) {
            for(var s in this.states) {
                mas[length] = s;
                length++;
            }
            return mas;
        } else {
            for (var z in this.states) {
                if (this.states[z].transitions[event] != undefined) {
                    mas[length] = z;
                    length++;
                }
            }
            return mas;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.start === this.state) {
            return false;
        }

        if(this.tmp == this.state) {
            var mass = [], lengths = 0;
            for (var k in this.states) {
                mass[lengths] = k;
                if(this.state == mass[lengths]) {
                    this.state = mass[lengths - 1];
                }
                lengths++;
            }
        }

        var mas = [], length = 0;
        for (var z in this.states) {
            mas[length] = z;
            if(this.state == mas[length]) {
                this.state = mas[length - 1];
            }
            length++;
        }

        if(this.tmpTwo) {
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.state = this.tmpTwo;

        if(this.start === this.state) {
            return false;
        }

        if(this.tmpTwo) {
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
