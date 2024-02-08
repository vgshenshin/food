function openModal(modalSelector, modalTimerId, scroll) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	document.body.style.marginRight = scroll + 'px';

	if (modalTimerId) {
		clearInterval(modalTimerId);  //  удаляем открытие окна через 50сек, если окно уже было открыто вручную
	}
}

function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.remove('show');
	modalWindow.classList.add('hide');
	document.body.style.overflow = '';
	document.body.style.marginRight = '0px';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal window

	const btnModalOpen = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(modalSelector),
		  scroll = calcScroll();

	btnModalOpen.forEach((elem) => {
		elem.addEventListener('click', () => openModal(modalSelector, modalTimerId, scroll));
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
			openModal(modalSelector, modalTimerId, scroll);
			window.removeEventListener('scroll', showModalByScroll);  //  удаляем обработчик события чтобы повторно не открывалось окно
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	function calcScroll() {
		const div = document.createElement('div');
		
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';
	
		document.body.appendChild(div);
	
		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
	
		return scrollWidth;
	}
}

export default modal;
export {openModal};
export {closeModal};