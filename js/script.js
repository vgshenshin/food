"use strict";

// полифилл для ES6 Promise / импор-я с помощью CommonJS
require('es6-promise').polyfill();

//  полифилл для forEach
// ES6 Modules import / импор-я с помощью Typescript import
import 'nodelist-foreach-polyfill';

// импортируем ф-ции из модулей
//  по стандарту ES6
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import cards from './modules/cards';
import slider from './modules/slider';
import forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);  //  через 50сек откр окно

	//  вызываем ф-ции
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2022-12-31:00:00:00');
	calc();
	cards();
	slider({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		field: '.offer__slider-inner',
		slide: '.offer__slide',
		totalCounter: '#total',
		wrapper: '.offer__slider-wrapper',
		currentCounter: '#current'
	});
	forms('form', modalTimerId);
	
});