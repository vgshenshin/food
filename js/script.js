"use strict";

window.addEventListener('DOMContentLoaded', () => {

	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),   //селектор одиночного таба
		  tabsContent = document.querySelectorAll('.tabcontent'),  //содержимое таба, контент
		  tabsParent = document.querySelector('.tabheader__items');  //родитель табов

	function hideTabContent() {                            //функция на скрытие элементов
		tabsContent.forEach(item => {                      // перебираем контент таба
			item.classList.add('hide');                    //скрывает контент у каждого таба
			item.classList.remove('show', 'fade');         // удаляем классы отображения и анимации
		});

		tabs.forEach(tab => {                               //перебираем каждый таб по отдельности
			tab.classList.remove('tabheader__item_active'); // и если на каком-то назначен класс активности, то убираем его.
		});
	}

	function showTabContent(i = 0) {  //функция показа. изначально активен тот, у к-ого индекс 0. т.е. 1ый эл-нт
		tabsContent[i].classList.add('show', 'fade'); //контент таба с инд i, станет видимым
		tabsContent[i].classList.remove('hide');      // удаляет класс скрытия контента с инд i
		tabs[i].classList.add('tabheader__item_active');  // табу с инд i назначается класс активности
	}

	hideTabContent();  //  вызывает ф-цию скрытие элементов
	showTabContent();  //  вызывает ф-цию показа эл-тов, но т.к. без аргумента - знач по умолч i = 0

	tabsParent.addEventListener('click', (e) => {   // делегирование события, назначаем клик на родителя табов, листенер следит событием и записывает все в ивент
		const target = e.target;                    // для удобства

		if (target && target.classList.contains('tabheader__item')) { // если таргет эвента И таргет эвента совпадает с селектором tabheader__item
			tabs.forEach((item, i) => {                               // то перебираем все элементы и их индексы
				if (target == item) {                                 // если тот таб куда нажали совпал с элементом, к-ый перебираем 
					hideTabContent();                                 // то скрываем всех(на случай если кто-то уже был активен)
					showTabContent(i);                                // и показываем только того, на кого кликнули.
				}
			});
		}
	});

	
	// Timer

	const deadline = '2022-12-31:00:00:00';  //  дата окончания "акции"

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

	setClock('.timer', deadline);  // запускаем функцию установки времени для определенного таймера. передаем первым аргументом тот таймер на сайте на к-ый нужно установить отсчет. а вторым аргументом сам дедлайн в формате строки

	
    // Modal window

    const btnModalOpen = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');


    function openModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);  //  удаляем открытие окна через 50сек, если окно уже было открыто вручную
    }

    btnModalOpen.forEach((elem) => {
        elem.addEventListener('click', openModal);
    });

    function closeModal() {
        modalWindow.style.display = '';
        document.body.style.overflow = '';
    }

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.style.display === 'block') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);  //  через 50сек откр окно

    function showModalByScroll() {
        //  проскроленная часть сайта + видимая сейчас часть сайта >= высоте всего сайта -1px
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);  //  удаляем обработчик события чтобы повторно не открывалось окно
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});