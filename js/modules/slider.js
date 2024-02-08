function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

	const slider = document.querySelector(container),   					//  весь слайдер
		  slides = document.querySelectorAll(slide),						//  получаем псевдомассив с контентом слайдов
		  prev = document.querySelector(prevArrow),							//  стрелочка назад
		  next = document.querySelector(nextArrow),							//  стрелочка вперед
		  total = document.querySelector(totalCounter),						//  цифра общего кол-ва слайдов
		  current = document.querySelector(currentCounter),					//  цифра текущего слайда
		  slidesWrapper = document.querySelector(wrapper),					//  главная обертка слайдов - выступает в роли рамки для видимой части слайдов
		  slidesField = document.querySelector(field),						//  доп.обертка слайдов в к-ой будут все слайды по горизонтали
		  slideWidth = +window.getComputedStyle(slidesWrapper).width.replace(/\D/g, "");	//  ширина обертки (рамка чрз к-ую смотрим на слайды)
		  //  это computed св-ва CSS т.е. из браузера, вытаскиваем из них width (ширину) и т.к. величина в px, с помощью replace сохр в переменную только цифры, + изменяет строку в число
	
	
	let slideIndex = 1,							//  индекс текущего слайда
		offset = 0;								//  отступ, на сколько % сдвинулась доп.обертка со слайдами

	if (slides.length < 10) {									// условие для добавления 0, если общ кол-во слайдов меньше 10
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;     
	}

	slidesField.style.width = 100 * slides.length + '%';		//  делаем ширину доп.обертки 400%, т.е. зависит от кол-ва слайдов
	slidesField.style.display = 'flex';							//  помещаем слайды в эту доп.обертку гориз-но др за др
	slidesField.style.transition = '0.5s all';					//  для плавного пролистывания слайдов

	slidesWrapper.style.overflow = 'hidden';					//  ограничиваем видимость рамки, чтобы слайды видны были только внутри рамки

	slides.forEach(slide => {									//  устанавливаем слайдам одинаковую ширину
		slide.style.width = `${slideWidth}px`;					//  берем за основу ширину рамки чрз к-ую будут видны слайды
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

export default slider;