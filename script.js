class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print();
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.running = false;
	    clearInterval(this.watch);
	    this.print();
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
	        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	        this.displayTime = setInterval(() => this.print(),10);
            stopButton.innerHTML = 'Stop';
	    }
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	    //this.print();
	}

	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}
	
	stop() {
	    this.running = false;
	    clearInterval(this.watch);

	}

	//add split time to results list
    split() {
        if(this.running) {
            addSplitTimeToList(this.format(this.times), resultList);
            clearInterval(this.displayTime);
            
            //display split time 
            setTimeout(() => {  
                this.displayTime = setInterval(() => {
                    this.print()
                }, 10);
            }, SPLIT_TIME_DISPLAY_INTERVAL);
        }
        else return;
    }
	

}

const SPLIT_TIME_DISPLAY_INTERVAL = 300;

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const resultList = document.querySelector('.results');

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

const splitButton = document.getElementById('split');
splitButton.addEventListener('click', () => stopwatch.split());

const clearResultsListButton = document.getElementById('clear');
clearResultsListButton.addEventListener('click', () => clearResultsList(resultList));

function pad0(value) {
	    let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
}

function addSplitTimeToList(value, resultList) {
    let element = document.createElement('li');
    element.innerText = value;
    resultList.appendChild(element);
}

function clearResultsList(resultList) {
    resultList.innerHTML = '';
}