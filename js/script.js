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


    new MenuCard(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        9, 
        '.menu .container',
        'menu__item'
    ).renderCard();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).renderCard();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).renderCard();


    //  Forms - принимаем данные пользователя с формы обр связи
        // создаем в корне проекта файл для back-end'a - server.php
        // исп-ем для отправки объект XMLHttpRequest
        // пробуем для отправки данных 2 разных формата объект FormData и JSON
        // для отправки JSON в server.php необходимо добавить: $_POST = json_decode(file_get_contents("php://input"), true);

        const forms = document.querySelectorAll('form');  //  получаем все формы обр связи

        const message = {                  // сообщение для информирования пользователя о статусе отправки запроса
            loading: 'img/form/spinner.svg',              //  исп-ем картинку спиннер для отображения загрузки
            success: 'Спасибо, скоро мы с вами свяжемся',
            failure: 'Что то пошло не так...'
        };

        //  применяем ф-цию постинга данных из ФОС ко всем формам с помощью перебора форм
        forms.forEach(item => {
            postData(item);
        });

        function postData(form) {                     // ф-ция отвечает за постинг данных
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

                
                const request = new XMLHttpRequest();  // это API, который предоставляет клиенту функциональность для обмена данными между клиентом и сервером
                request.open('POST', 'server.php');  //  настраиваем - POST отправку на сервер, второй арг это путь к серверу
    
                // request.setRequestHeader('Content-type', 'multipart/form-data');  //  настройка заголовка для объекта FormData
                // связка XMLHttpRequest и FormData не работает с указанием заголовка, поэтому заголовок не пишем !!!

                request.setRequestHeader('Content-type', 'application/json');  //  настройка заголовка для объекта JSON
    
                const formData = new FormData(form);  // Объект FormData позволяет создать набор пар ключ/значение и передать их. На input'ах должен быть атрибут name!!!

                //  создаем объект и помещаем в него данные из formData чтобы потом трансформировать их в JSON
                const object = {};
                formData.forEach(function(value, key){
                    object[key] = value;
                });

                const json = JSON.stringify(object);  //  трансформирует обычный объект в JSON
                request.send(json);  //  отправляем к серверу Объект JSON через XMLHttpRequest()

                // request.send(formData);  //  отправляем к серверу Объект FormData через XMLHttpRequest()


                //  слушаем событие load от XMLHttpRequest()
                request.addEventListener('load', () => {              //  отслеживаем конечную загрузку запроса
                    if (request.status === 200) {                     //  если запрос прошел статус ОК(200)
                        console.log(request.response);                //  выведем в консоль объект с данными из ФОС
                        showThanksModal(message.success);             //  вызываем ф-цию показа окна благодарности
                        form.reset();                                 //  очистка ФОС от введенных данных
                        statusMessage.remove();                       //  очищаем сообщ польз о загрузке (спиннер)
                    } else {                                          //  негативный сценарий если запрос НЕ прошел статус ОК(200)
                        showThanksModal(message.failure);             //  вызываем ф-цию показа окна с сообщ польз о проблеме в отправке
                    }
                });
            });
        }
    

        //  создаем окно благодарности (после отправки данных)

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');  //  получаем существующее мод окно в переменную
    
            prevModalDialog.classList.add('hide');                             //  скрывает предыдущий контент (ФОС, инпуты)
            openModal();                                                       //  открывает мод окно
    
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
                closeModal();                                       //  закрываем мод окно чтобы всё это обновление контента не видел пользователь
            }, 2000);
        }

});