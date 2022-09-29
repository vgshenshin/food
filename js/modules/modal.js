function modal() {
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
}

module.exports = modal;