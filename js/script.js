"use strict";

window.addEventListener('DOMContentLoaded', () => {

	// импортируем ф-ции из модулей
	const tabs = require('./modules/tabs'),
		  modal = require('./modules/modal'),
		  timer = require('./modules/timer'),
		  calc = require('./modules/calc'),
		  cards = require('./modules/cards'),
		  slider = require('./modules/slider'),
		  forms = require('./modules/forms');
	
	//  вызываем ф-ции
	tabs();
	modal();
	timer();
	calc();
	cards();
	slider();
	forms();
	
});