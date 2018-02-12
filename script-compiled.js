'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
				function Stopwatch(display) {
								_classCallCheck(this, Stopwatch);

								this.running = false;
								this.display = display;
								this.times = {
												minutes: 0,
												seconds: 0,
												miliseconds: 0
								};
								this.print();
				}

				_createClass(Stopwatch, [{
								key: 'reset',
								value: function reset() {
												this.times = {
																minutes: 0,
																seconds: 0,
																miliseconds: 0
												};
												this.running = false;
												clearInterval(this.watch);
												this.print();
								}
				}, {
								key: 'print',
								value: function print() {
												this.display.innerText = this.format(this.times);
								}
				}, {
								key: 'format',
								value: function format(times) {
												return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
								}
				}, {
								key: 'start',
								value: function start() {
												var _this = this;

												if (!this.running) {
																this.running = true;
																this.watch = setInterval(function () {
																				return _this.step();
																}, 10);
																this.displayTime = setInterval(function () {
																				return _this.print();
																}, 10);
																stopButton.innerHTML = 'Stop';
												}
								}
				}, {
								key: 'step',
								value: function step() {
												if (!this.running) return;
												this.calculate();
												//this.print();
								}
				}, {
								key: 'calculate',
								value: function calculate() {
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
				}, {
								key: 'stop',
								value: function stop() {
												this.running = false;
												clearInterval(this.watch);
								}

								//add split time to results list

				}, {
								key: 'split',
								value: function split() {
												var _this2 = this;

												if (this.running) {
																addSplitTimeToList(this.format(this.times), resultList);
																clearInterval(this.displayTime);

																//display split time 
																setTimeout(function () {
																				_this2.displayTime = setInterval(function () {
																								_this2.print();
																				}, 10);
																}, SPLIT_TIME_DISPLAY_INTERVAL);
												} else return;
								}
				}]);

				return Stopwatch;
}();

var SPLIT_TIME_DISPLAY_INTERVAL = 300;

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var resultList = document.querySelector('.results');

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
				return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
				return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
				return stopwatch.reset();
});

var splitButton = document.getElementById('split');
splitButton.addEventListener('click', function () {
				return stopwatch.split();
});

var clearResultsListButton = document.getElementById('clear');
clearResultsListButton.addEventListener('click', function () {
				return clearResultsList(resultList);
});

function pad0(value) {
				var result = value.toString();
				if (result.length < 2) {
								result = '0' + result;
				}
				return result;
}

function addSplitTimeToList(value, resultList) {
				var element = document.createElement('li');
				element.innerText = value;
				resultList.appendChild(element);
}

function clearResultsList(resultList) {
				resultList.innerHTML = '';
}
