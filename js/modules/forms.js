import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
	//  Forms - принимаем данные пользователя с формы обр связи
		// создаем в корне проекта файл для back-end'a - server.php
		// исп-ем для отправки объект XMLHttpRequest
		// пробуем для отправки данных 2 разных формата объект FormData и JSON
		// для отправки JSON в server.php необходимо добавить: $_POST = json_decode(file_get_contents("php://input"), true);

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

				
				// const request = new XMLHttpRequest();  // это API, который предоставляет клиенту функциональность для обмена данными между клиентом и сервером
				// request.open('POST', 'server.php');  //  настраиваем - POST отправку на сервер, второй арг это путь к серверу
	
				// request.setRequestHeader('Content-type', 'multipart/form-data');  //  настройка заголовка для объекта FormData
				// связка XMLHttpRequest и FormData не работает с указанием заголовка, поэтому заголовок не пишем !!!

				// request.setRequestHeader('Content-type', 'application/json');  //  настройка заголовка для объекта JSON
	
				const formData = new FormData(form);  // Объект FormData позволяет создать набор пар ключ/значение и передать их. На input'ах должен быть атрибут name!!!

				const json = JSON.stringify(Object.fromEntries(formData.entries()));  // трнсформируем formData в JSON

				//  создаем объект и помещаем в него данные из formData чтобы потом трансформировать их в JSON
				// const object = {};
				// formData.forEach(function(value, key){
				//     object[key] = value;
				// });

				// const json = JSON.stringify(object);  //  трансформирует обычный объект в JSON
				// request.send(json);  //  отправляем к серверу Объект JSON через XMLHttpRequest()

				// request.send(formData);  //  отправляем к серверу Объект FormData через XMLHttpRequest()

				//-------------------------fetch API------------------------------------------------------------------
				// постим данные с ФОС на сервер с помощью fetch API
				// 1. В виде FormData
				// fetch('server.php', {           //  в файле server.php не забудь удалить строку с json_decode
				//     method: "POST",
				//     body: formData
				// })
				// .then(data => data.text())      //  трансформирует formData в текст чтобы вывести в консоль
				// .then(data => {
				//     console.log(data);
				//     showThanksModal(message.success);
				// }).catch(() => {
				//     showThanksModal(message.failure);
				// }).finally(() => {
				//     form.reset();
				//     statusMessage.remove();
				// });

				
				// 2. В виде JSON
				// fetch('server.php', {           //  в файле server.php не забудь прописать строку с json_decode
				//     method: "POST",
				//     headers: {
				//         'Content-type': 'application/json'
				//     },
				//     body: json                  //  json - это переменная в к-ой хранятся данный с ФОС в JSON формате(стр.278-283) 
				// })
				// .then(data => data.text())      //  трансформирует JSON в текст чтобы вывести в консоль
				// .then(data => {
				//     console.log(data);
				//     showThanksModal(message.success);
				// }).catch(() => {
				//     showThanksModal(message.failure);
				// }).finally(() => {
				//     form.reset();
				//     statusMessage.remove();
				// });

				// исп-ем ф-цию для оптимизации кода по работе с сервером
				postData('http://localhost:3000/requests', json)        // из ф-ции вернется промис
					.then(data => {
						console.log(data);
						showThanksModal(message.success);
					}).catch(() => {
						showThanksModal(message.failure);
					}).finally(() => {
						form.reset();
						statusMessage.remove();
					});


				//--------------------------------------------------------------------------------------------

				//  слушаем событие load от XMLHttpRequest()
				// request.addEventListener('load', () => {              //  отслеживаем конечную загрузку запроса
				//     if (request.status === 200) {                     //  если запрос прошел статус ОК(200)
				//         console.log(request.response);                //  выведем в консоль объект с данными из ФОС
				//         showThanksModal(message.success);             //  вызываем ф-цию показа окна благодарности
				//         form.reset();                                 //  очистка ФОС от введенных данных
				//         statusMessage.remove();                       //  очищаем сообщ польз о загрузке (спиннер)
				//     } else {                                          //  негативный сценарий если запрос НЕ прошел статус ОК(200)
				//         showThanksModal(message.failure);             //  вызываем ф-цию показа окна с сообщ польз о проблеме в отправке
				//     }
				// });
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