import {getResource} from '../services/services';

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


	getResource('https://script.google.com/macros/s/AKfycbybt3cFUux13jTCULikFepK_8rSs3nIwVYqmvE1jc-6uLIHVj330e4X0qAhm0dkNJaEPQ/exec')
		.then(data => {                                                        //  обрабатываем промис пришедший от fetch
			data.menu.forEach(({img, altimg, title, descr, price}) => {             //  применяем деструктуризацию объекта с данными карточек
				new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();   //  рендерим карточки на страницу
			});
		});
}

export default cards;