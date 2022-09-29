function slider() {
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

	const slides = document.querySelectorAll('.offer__slide'),                               //  получаем псевдомассив с контентом слайдов
		  prev = document.querySelector('.offer__slider-prev'),                              //  стрелочка назад
		  next = document.querySelector('.offer__slider-next'),                              //  стрелочка вперед
		  total = document.querySelector('#total'),                                          //  цифра общего кол-ва слайдов
		  current = document.querySelector('#current'),                                      //  цифра текущего слайда
		  slidesWrapper = document.querySelector('.offer__slider-wrapper'),                  //  главная обертка слайдов - выступает в роли рамки для видимой части слайдов
		  slidesField = document.querySelector('.offer__slider-inner'),                      //  доп.обертка слайдов в к-ой будут все слайды по горизонтали
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

	const slider = document.querySelector('.offer__slider'),   //  весь слайдер
		  dotsArr = [];
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

module.exports = slider;