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

	getResource('http://localhost:3000/menu')
		.then(data => {                                                        //  обрабатываем промис пришедший от fetch
			data.forEach(({img, altimg, title, descr, price}) => {             //  применяем деструктуризацию объекта с данными карточек
				new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();   //  рендерим карточки на страницу
			});
		});
}

module.exports = cards;