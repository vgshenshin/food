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

export default calc;