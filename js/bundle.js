/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	//  Calc

	const result = document.querySelector('.calculating__result span');

	let gender = 'female', 
		height, weight, age, 
		ratio = 1.375;

	if (localStorage.getItem('gender')) {
		gender = localStorage.getItem('gender');
	} else {
		gender = 'female';
		localStorage.setItem('gender', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
		

			if (elem.getAttribute('id') === localStorage.getItem('gender')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


	function getToCalc() {
		if (!gender || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (gender == 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	getToCalc();

	function changeDataParameter(selector, activeClass) {
		const wrapper = document.querySelectorAll(selector);
		wrapper.forEach(item => {
			item.addEventListener('click', (e) => {

				wrapper.forEach(item => {
					item.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);

				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					gender = e.target.getAttribute('id');
					localStorage.setItem('gender', e.target.getAttribute('id'));
				}

				getToCalc();
			});
		});
	}

	changeDataParameter('#gender div', 'calculating__choose-item_active');
	changeDataParameter('.calculating__choose_big div', 'calculating__choose-item_active');

	function changeInputParameter(selector) {
		const input = document.querySelector(selector);

			input.addEventListener('input', () => {

				if (input.value.match(/\D/g)) {
					input.style.boxShadow = '0 4px 15px rgb(255 0 0 / 50%)';
				} else {
					input.style.boxShadow = '';					
				}

				switch (input.getAttribute('id')) {
					case 'height':
						height = +input.value;
						break;
					case 'weight':
						weight = +input.value;
						break;
					case 'age':
						age = +input.value;
						break;
				}
			getToCalc();
			});
	}

	changeInputParameter('#height');
	changeInputParameter('#weight');
	changeInputParameter('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.convert = 75;
			this.parent = document.querySelector(parentSelector);
			this.convertRub();
		}

		convertRub() {
			this.price = this.price * this.convert;
		}

		renderCard() {
			const div = document.createElement('div');
			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				div.classList.add(this.classes);
			} else {
				this.classes.forEach(className => div.classList.add(className));
			}
			
			div.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.subtitle}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;


			this.parent.append(div);
		}
	}


	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {                                                        //  обрабатываем промис пришедший от fetch
			data.forEach(({img, altimg, title, descr, price}) => {             //  применяем деструктуризацию объекта с данными карточек
				new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();   //  рендерим карточки на страницу
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	//  Forms - принимаем данные пользователя с формы обр связи
		// создаем в корне проекта файл для back-end'a - server.php
		// исп-ем для отправки объект XMLHttpRequest
		// пробуем для отправки данных 2 разных формата объект FormData и JSON
		// для отправки JSON в server.php необходимо добавить: $_POST = json_decode(file_get_contents("php://input"), true);

		const forms = document.querySelectorAll(formSelector);  //  получаем все формы обр связи

		const message = {                  // сообщение для информирования пользователя о статусе отправки запроса
			loading: 'img/form/spinner.svg',              //  исп-ем картинку спиннер для отображения загрузки
			success: 'Спасибо, скоро мы с вами свяжемся',
			failure: 'Что то пошло не так...'
		};

		//  применяем ф-цию постинга данных из ФОС ко всем формам с помощью перебора форм
		forms.forEach(item => {
			bindPostData(item);
		});


		function bindPostData(form) {                     // ф-ция отвечает за постинг данных
			form.addEventListener('submit', (e) => {  //  submit срабатывает при отправке ФОС
				e.preventDefault();                   //  отменяем перезагрузку стр при отправке
	
				//  помещаем на страницу статус отправки запроса на сервер в виде картинки (для наглядного представления пользовотелю) 
				const statusMessage = document.createElement('img');  //  создаем тег img
				statusMessage.src = message.loading;                  //  подставляем атрибут src со ссылкой на картинку из объекта message
				statusMessage.style.cssText =                         //  установим css стили к спиннеру
				`
					display: block;
					margin: 0 auto;
				`;
				
				form.insertAdjacentElement('afterend', statusMessage);  //  и выводим под ФОС информируя пользователя о статусе отправки

				
				// const request = new XMLHttpRequest();  // это API, который предоставляет клиенту функциональность для обмена данными между клиентом и сервером
				// request.open('POST', 'server.php');  //  настраиваем - POST отправку на сервер, второй арг это путь к серверу
	
				// request.setRequestHeader('Content-type', 'multipart/form-data');  //  настройка заголовка для объекта FormData
				// связка XMLHttpRequest и FormData не работает с указанием заголовка, поэтому заголовок не пишем !!!

				// request.setRequestHeader('Content-type', 'application/json');  //  настройка заголовка для объекта JSON
	
				const formData = new FormData(form);  // Объект FormData позволяет создать набор пар ключ/значение и передать их. На input'ах должен быть атрибут name!!!

				const json = JSON.stringify(Object.fromEntries(formData.entries()));  // трнсформируем formData в JSON

				//  создаем объект и помещаем в него данные из formData чтобы потом трансформировать их в JSON
				// const object = {};
				// formData.forEach(function(value, key){
				//     object[key] = value;
				// });

				// const json = JSON.stringify(object);  //  трансформирует обычный объект в JSON
				// request.send(json);  //  отправляем к серверу Объект JSON через XMLHttpRequest()

				// request.send(formData);  //  отправляем к серверу Объект FormData через XMLHttpRequest()

				//-------------------------fetch API------------------------------------------------------------------
				// постим данные с ФОС на сервер с помощью fetch API
				// 1. В виде FormData
				// fetch('server.php', {           //  в файле server.php не забудь удалить строку с json_decode
				//     method: "POST",
				//     body: formData
				// })
				// .then(data => data.text())      //  трансформирует formData в текст чтобы вывести в консоль
				// .then(data => {
				//     console.log(data);
				//     showThanksModal(message.success);
				// }).catch(() => {
				//     showThanksModal(message.failure);
				// }).finally(() => {
				//     form.reset();
				//     statusMessage.remove();
				// });

				
				// 2. В виде JSON
				// fetch('server.php', {           //  в файле server.php не забудь прописать строку с json_decode
				//     method: "POST",
				//     headers: {
				//         'Content-type': 'application/json'
				//     },
				//     body: json                  //  json - это переменная в к-ой хранятся данный с ФОС в JSON формате(стр.278-283) 
				// })
				// .then(data => data.text())      //  трансформирует JSON в текст чтобы вывести в консоль
				// .then(data => {
				//     console.log(data);
				//     showThanksModal(message.success);
				// }).catch(() => {
				//     showThanksModal(message.failure);
				// }).finally(() => {
				//     form.reset();
				//     statusMessage.remove();
				// });

				// исп-ем ф-цию для оптимизации кода по работе с сервером
				(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)        // из ф-ции вернется промис
					.then(data => {
						console.log(data);
						showThanksModal(message.success);
					}).catch(() => {
						showThanksModal(message.failure);
					}).finally(() => {
						form.reset();
						statusMessage.remove();
					});


				//--------------------------------------------------------------------------------------------

				//  слушаем событие load от XMLHttpRequest()
				// request.addEventListener('load', () => {              //  отслеживаем конечную загрузку запроса
				//     if (request.status === 200) {                     //  если запрос прошел статус ОК(200)
				//         console.log(request.response);                //  выведем в консоль объект с данными из ФОС
				//         showThanksModal(message.success);             //  вызываем ф-цию показа окна благодарности
				//         form.reset();                                 //  очистка ФОС от введенных данных
				//         statusMessage.remove();                       //  очищаем сообщ польз о загрузке (спиннер)
				//     } else {                                          //  негативный сценарий если запрос НЕ прошел статус ОК(200)
				//         showThanksModal(message.failure);             //  вызываем ф-цию показа окна с сообщ польз о проблеме в отправке
				//     }
				// });
			});
		}
	

		//  создаем окно благодарности (после отправки данных)

		function showThanksModal(message) {
			const prevModalDialog = document.querySelector('.modal__dialog');  //  получаем существующее мод окно в переменную
	
			prevModalDialog.classList.add('hide');                             //  скрывает предыдущий контент (ФОС, инпуты)
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);                                                       //  открывает мод окно
	
			const thanksModal = document.createElement('div');                 //  создаем обертку
			thanksModal.classList.add('modal__dialog');                        //  присваиваем тот же класс что был у ФОС
			thanksModal.innerHTML =                                            //  вставляем контент: крестик для закрытия и сообщение
			`
				<div class="modal__content">
					<div class="modal__close" data-close>&times;</div>
					<div class="modal__title">${message}</div>
				</div>
			`;
	
			document.querySelector('.modal').append(thanksModal);   //  получаем мод окно и сразу же вставляем в него контент
			setTimeout(() => {                                      //  ф-ция для очистки мод окна через 4сек
				thanksModal.remove();                               //  удаляем контент с сообщением пользователю
				prevModalDialog.classList.add('show');              //  показываем предыдущий контент т.е. ФОС с инпуами
				prevModalDialog.classList.remove('hide');           //  удаляем класс скрытия ФОС примененный на 306 строке
				(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');                               //  закрываем мод окно чтобы всё это обновление контента не видел пользователь
			}, 2000);
		}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);  //  удаляем открытие окна через 50сек, если окно уже было открыто вручную
	}
}

function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.remove('show');
	modalWindow.classList.add('hide');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal window

	const btnModalOpen = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(modalSelector);

	btnModalOpen.forEach((elem) => {
		elem.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		//  проскроленная часть сайта + видимая сейчас часть сайта >= высоте всего сайта -1px
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);  //  удаляем обработчик события чтобы повторно не открывалось окно
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	// simple slider (lesson 92)

	// алгоритм работы по созданию слайдера
	// 1 - получить эл-ты
	// 2 - сделать индекс к-ый определяет текущий слайд, его будем исп-ть в числовом обозначении сверху и изменять
	// 3 - написание ф-ции к-ая будем заниматься показом слайдов. Будет две ф-ции)
	//     - показ какого то опред слайда
	//     - скрытие других, к-ых не видим (принимает индекс, по этому индексу показывает, а оставшиеся скрывает), и 
	//       проверяет условие - когда дошли до конца => переходим на 1 слайд и наоборот
	// 4 - навешивание обраб событ на стрелки и если вправо то выполн ф-ция и показ след слайд и изменяет индекс +1 и наоборот
	// 5 - определяем кол-во слайдов и помещаем в графу общего кол-ва слайдов на стр
	// 6 - добавить ноль при нумерации
/*
	const slides = document.querySelectorAll('.offer__slide'),    //  получаем псевдомассив с контентом слайдов
		  prev = document.querySelector('.offer__slider-prev'),   //  стрелочка назад
		  next = document.querySelector('.offer__slider-next'),   //  стрелочка вперед
		  total = document.querySelector('#total'),               //  цифра общего кол-ва слайдов
		  current = document.querySelector('#current');           //  цифра текущего слайда
	let slideIndex = 1;                                       //  индекс текущего слайда

	showSlides(slideIndex);                                   // запускаем ф-цию показа и скрытия слайдов(арг - Индекс текущего слайда = 1)

	if (slides.length < 10) {                                 // условие для добавления 0, если общ кол-во слайдов меньше 10
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;        
	}

	function showSlides(n) {                                 // ф-ция показа и скрытия слайдов(арг = Индекс текущего слайда)
		if (n > slides.length) {                             // условие: когда долистали до конца всех слайдов
			slideIndex = 1;                                  // присвоить Индексу текущего слайда 1, т.е. вернуть в начало
		}
															 
		if (n < 1) {                                         //  условие: когда долистали до начала всех слайдов
			slideIndex = slides.length;                      // присвоить Индексу текущего слайда число равное кол-ву слайдов в псевдомассиве, т.е. вернуть в конец
		}

		slides.forEach(item => item.classList.add('hide'));  //  скрываем все слайды

		//  когда индекс текущего слайда равен 1, ни одно условие не сработает и цифра 1 подставится ниже в индекс
		slides[slideIndex - 1].classList.remove('hide');

		if (slideIndex < 10) {                           // условие для добавления 0, если индекс текущего слайда меньше 10
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);
	});

	next.addEventListener('click', () => {
		plusSlides(1);
	});
*/

	// hard slider - carousel (lesson 93)
	// в html добавить div обертку для слайдов

	const slider = document.querySelector(container),   //  весь слайдер
		  slides = document.querySelectorAll(slide),                               //  получаем псевдомассив с контентом слайдов
		  prev = document.querySelector(prevArrow),                              //  стрелочка назад
		  next = document.querySelector(nextArrow),                              //  стрелочка вперед
		  total = document.querySelector(totalCounter),                                          //  цифра общего кол-ва слайдов
		  current = document.querySelector(currentCounter),                                      //  цифра текущего слайда
		  slidesWrapper = document.querySelector(wrapper),                  //  главная обертка слайдов - выступает в роли рамки для видимой части слайдов
		  slidesField = document.querySelector(field),                      //  доп.обертка слайдов в к-ой будут все слайды по горизонтали
		  slideWidth = +window.getComputedStyle(slidesWrapper).width.replace(/\D/g, "");	 //  ширина обертки (рамка чрз к-ую смотрим на слайды)
		  //  это computed св-ва CSS т.е. из браузера, вытаскиваем из них width (ширину) и т.к. величина в px, с помощью replace сохр в переменную только цифры, + изменяет строку в число
	let slideIndex = 1,                                       //  индекс текущего слайда
		offset = 0;                                           //  отступ, на сколько % сдвинулась доп.обертка со слайдами

	if (slides.length < 10) {                                 // условие для добавления 0, если общ кол-во слайдов меньше 10
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;     
	}

	slidesField.style.width = 100 * slides.length + '%';      //  делаем ширину доп.обертки 400%, т.е. зависит от кол-ва слайдов
	slidesField.style.display = 'flex';                       //  помещаем слайды в эту доп.обертку гориз-но др за др
	slidesField.style.transition = '0.5s all';                //  для плавного пролистывания слайдов

	slidesWrapper.style.overflow = 'hidden';                  //  ограничиваем видимость рамки, чтобы слайды видны были только внутри рамки

	slides.forEach(slide => {                                 //  устанавливаем слайдам одинаковую ширину
		slide.style.width = `${slideWidth}px`;                //  берем за основу ширину рамки чрз к-ую будут видны слайды
	});


	next.addEventListener('click', () => {
		if (offset == slideWidth * (slides.length - 1)) {         //  если отступ равен ширине 1ого слайда*на кол-во слайдов-1, т.е. последний слайд в рамке
			offset = 0;                                           //  то переставляем отступ в 0, т.е. в начало всех слайдов
		} else {
			offset += slideWidth;                                 //  если не последний слайд то прибавляем к отступу ширину слайда и слайд будет смещаться
		}
		slidesField.style.transform = `translateX(-${offset}px)`;  //  сдвигает доп.обертку со слайдами влево

		if (slideIndex == slides.length) {                         //  условие для добавления единицы к индексу текущего слайда
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slideIndex < 10) {                                     //  условие для добавления 0, если индекс текущего слайда меньше 10
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		// dots for carousel
		dotsArr.forEach(dot => dot.style.opacity = '.5');     //  перебираем все точки в массиве и назначаем им прозрачность 0.5
		dotsArr[slideIndex - 1].style.opacity = 1;            //  та точка к-ая соответствует индекс текущего слайда - прозрачность 1 (активная)
	});

	prev.addEventListener('click', () => {                      //  при нажатии на кнопку prev проверяем
		if (offset == 0) {                                          //  если отступ равен 0, т.е. первый слайд в рамке
			offset = slideWidth * (slides.length - 1);              //  то переставляем отступ на последний слайд
		} else {
			offset -= slideWidth;                                   //  если не первый слайд, то минусуем у отступа ширину слайда и слайд будет смещаться
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {                                      //  условие для уменьшения на единицу индекса текущего слайда
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slideIndex < 10) {                                      //  условие для добавления 0, если индекс текущего слайда меньше 10
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		// dots for carousel
		dotsArr.forEach(dot => dot.style.opacity = '.5');     //  перебираем все точки в массиве и назначаем им прозрачность 0.5
		dotsArr[slideIndex - 1].style.opacity = 1;            //  та точка к-ая соответствует индекс текущего слайда - прозрачность 1 (активная)
	});

	// dots for carousel

	const dotsArr = [];

	slider.style.position = 'relative';

	const dots = document.createElement('ol');
		  dots.classList.add('carousel-indicators');
		  slider.append(dots);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');        //  создаем точки слайдера
		dot.setAttribute('data-slide-to', i + 1);        //  уст-ем data атрибут всем точкам и присваиваем каждому data атрибуту цифру от 1 до 4 (кол-во слайдов)
		dot.classList.add('dot');

		if (i == 0) {
			dot.style.opacity = 1;                       //  уст-ем прозрачность первой точки в 1(когда цикл прошел вперый раз)
		}
		dots.append(dot);
		dotsArr.push(dot);                               //  пушим сформированную точку в массив
	}

	dotsArr.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = slideWidth * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slideIndex < 10) {                                      //  условие для добавления 0, если индекс текущего слайда меньше 10
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dotsArr.forEach(dot => dot.style.opacity = '.5');     //  перебираем все точки в массиве и назначаем им прозрачность 0.5
			dotsArr[slideIndex - 1].style.opacity = 1;            //  та точка к-ая соответствует индекс текущего слайда - прозрачность 1 (активная)
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

	const tabs = document.querySelectorAll(tabsSelector),   //селектор одиночного таба
          tabsContent = document.querySelectorAll(tabsContentSelector),  //содержимое таба, контент
          tabsParent = document.querySelector(tabsParentSelector);  //родитель табов

    function hideTabContent() {                            //функция на скрытие элементов
        tabsContent.forEach(item => {                      // перебираем контент таба
            item.classList.add('hide');                    //скрывает контент у каждого таба
            item.classList.remove('show', 'fade');         // удаляем классы отображения и анимации
        });

        tabs.forEach(tab => {                               //перебираем каждый таб по отдельности
            tab.classList.remove(activeClass); // и если на каком-то назначен класс активности, то убираем его.
        });
    }

    function showTabContent(i = 0) {  //функция показа. изначально активен тот, у к-ого индекс 0. т.е. 1ый эл-нт
        tabsContent[i].classList.add('show', 'fade'); //контент таба с инд i, станет видимым
        tabsContent[i].classList.remove('hide');      // удаляет класс скрытия контента с инд i
        tabs[i].classList.add(activeClass);  // табу с инд i назначается класс активности
    }

    hideTabContent();  //  вызывает ф-цию скрытие элементов
    showTabContent();  //  вызывает ф-цию показа эл-тов, но т.к. без аргумента - знач по умолч i = 0

    tabsParent.addEventListener('click', (e) => {   // делегирование события, назначаем клик на родителя табов, листенер следит событием и записывает все в ивент
        const target = e.target;                    // для удобства

        if (target && target.classList.contains(tabsSelector.slice(1))) { // если таргет эвента И таргет эвента совпадает с селектором tabheader__item (slice удалит .)
            tabs.forEach((item, i) => {                               // то перебираем все элементы и их индексы
                if (target == item) {                                 // если тот таб куда нажали совпал с элементом, к-ый перебираем 
                    hideTabContent();                                 // то скрываем всех(на случай если кто-то уже был активен)
                    showTabContent(i);                                // и показываем только того, на кого кликнули.
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	// Timer

	// const deadline = '2022-12-31:00:00:00';  //  дата окончания "акции" - передаем это значение в вызове ф-ции в script.js

	function getTimeRemaining(endtime) {                          // функция по расчету промежутков
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());  // создаем локальную переменную в к-ую методом Date.parse разбираем строковое значение и переводим его в милисекунды. от этих милисекунд отнимаем также переведенное в милисекунды ВРЕМЯ ДАТЫ ИЗ СИСТЕМЫ. получаем разницу к-ую и будет отсчитывать таймер
		
		if (t <= 0) {                   // условие если дата окончания "акции" меньше сегодняшней
			days = 0;                   // назначить всем переменным 0
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),  //  вычисляем дни. выводим разультат без остатка округляя ч/з math.floor. РАЗНИЦУ делим на произведение (1000мс *60с(кол-во мс в 1мин) *60м(кол-во мс в 1 часе) и *24 часа(кол-во мс в 1 сутках)). Разницу таймера в мс делим на мс в одних сутках и получаем СКОЛЬКО СУТОК ОСТАЛОСЬ ДО ОКОНЧАНИЕ НАШЕЙ ДАТЫ
			hours = Math.floor(t / (1000 * 60 * 60) % 24),  // (общ разницу в мс делим на количество мс в одном часе) делим это % на 24 и % возвращает нам остаток от деления. (напр: 52ч % 24ч = 2сут. их отбрасываем, а 4ч в остатке записываем)
			minutes = Math.floor((t / (1000 * 60)) % 60),  // то же что и выше, только остаток от деления на 60 будет остаток минут
			seconds = Math.floor((t / 1000) % 60);         // то же что и выше, только остаток от деления на 60 будет остаток секунд
		}
		
		return {        //ф-ция возвращает обьект в к-ом на основе расчетов получены отдельные данные
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
	}

	function getZero(num) {           // добавления нуля к числам до 10
		if (num >= 0 && num < 10) {   // сработает если число больше или равно нулю И меньше 10
			return `0${num}`;         //возвращаем добавочный ноль и то число, к-ое было передано в арг
		} else {                      // если число больше 10
			return num;               // просто возвращаем его без изменений
		}
	}

	function setClock(selector, endtime) {         // ф-ция установки таймера на стр принимает 2 аргумента
		const timer = document.querySelector(selector),  //получаем таймер. если их на странице будет несколько, то их селектор передается сюда первым арг
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  interval = setInterval(refreshClock, 1000); // с интервалом в 1сек будем запускать функцию updateClock. имитация стрелки часов

		refreshClock();  // запускается тут-для того, чтобы не было скачков цифр т.к. срабатывал интервал запуска через 1сек (начинает действовать с момента загрузки стр)

		function refreshClock() {
			const t = getTimeRemaining(endtime); // записывает объект как результат работы функции "по расчету промежутков времени". теперь в t хранится обьект с уже полученными данными

			// закидываем всё это дело в верстку
			days.innerHTML = getZero(t.days);  // в полученный по id #days тег переписывает значение из объекта, проверяя, надо ли подставлять ноль или нет
			hours.innerHTML = getZero(t.hours);      // то же только часы
			minutes.innerHTML = getZero(t.minutes);  // то же только минуты
			seconds.innerHTML = getZero(t.seconds);  // то же только сек

			if (t.total <= 0) {    // проверяем св-во total у объекта от функции getTimeRemaining(), и если оно равняется нулю, значит таймер истек
				clearInterval(interval);  // очистка интервала и таймер останавливается
			}
		}
	}

	setClock(id, deadline);  // запускаем функцию установки времени для определенного таймера. передаем первым аргументом тот таймер на сайте на к-ый нужно установить отсчет. а вторым аргументом сам дедлайн в формате строки
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//  ф-ция отвечающая за функционал сервера POST запросы
const postData = async (url, data) => {
    const res = await fetch(url, {                    //  создается запрос к серверу (асинхронный код) поэтому применяем async/await
        method: "POST",                               //  теперь переменная res будет ждать ответа (промиса) от fetch и только после этого
        headers: {                                    //  в нее запишется результат запроса
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();                        //  тут промис трансформируется из JSON в объект
};

//  ф-ция отвечающая за функционал сервера GET запросы
/*создается запрос к серверу (асинхронный код) поэтому применяем async/await
теперь переменная res будет ждать ответа (промиса) от fetch и только после этого
в нее запишется результат запроса*/
const getResource = async (url) => {
    const res = await fetch(url);              

    if(!res.ok) {                              //  проверяем на ошибку в запросе с помощью св-в промиса
        // создаем объект ошибки и throw - это выкинуть ее в консоль
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);   //  св-во status - статус к-ый вернул нам сервер(200, 404, 500 и др)
    }
    return await res.json();              //  тут промис трансформируется из JSON в объект
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");


// импортируем ф-ции из модулей
//  по стандарту ES6









window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);  //  через 50сек откр окно

	//  вызываем ф-ции
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-12-31:00:00:00');
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		field: '.offer__slider-inner',
		slide: '.offer__slide',
		totalCounter: '#total',
		wrapper: '.offer__slider-wrapper',
		currentCounter: '#current'
	});
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);
	
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map