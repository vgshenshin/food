import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

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
	
				const formData = new FormData(form);  // Объект FormData позволяет создать набор пар ключ/значение и передать их. На input'ах должен быть атрибут name!!!

				// исп-ем ф-цию для оптимизации кода по работе с сервером
				postData('https://script.google.com/macros/s/AKfycbyILGctWH90IsZ99nFYKPETJWnYEVaEWouSs2w2vDu6IDFQu5Ckt_mLQg1dhRHBO3CRjw/exec', formData)        // из ф-ции вернется промис
					.then(() => {
						showThanksModal(message.success);
					}).catch(() => {
						showThanksModal(message.failure);
					}).finally(() => {
						form.reset();
						statusMessage.remove();
					});
			});
		}

		//  создаем окно благодарности (после отправки данных)
		function showThanksModal(message) {
			const prevModalDialog = document.querySelector('.modal__dialog');  //  получаем существующее мод окно в переменную
	
			prevModalDialog.classList.add('hide');                             //  скрывает предыдущий контент (ФОС, инпуты)
			openModal('.modal', modalTimerId);                                                       //  открывает мод окно
	
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
				closeModal('.modal');                               //  закрываем мод окно чтобы всё это обновление контента не видел пользователь
			}, 2000);
		}
}

export default forms;