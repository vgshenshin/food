function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

	const tabs = document.querySelectorAll(tabsSelector),   //селектор одиночного таба
          tabsContent = document.querySelectorAll(tabsContentSelector),  //содержимое таба, контент
          tabsParent = document.querySelector(tabsParentSelector);  //родитель табов

    function hideTabContent() {                            //функция на скрытие элементов
        tabsContent.forEach(item => {                      // перебираем контент таба
            item.classList.add('hide');                    //скрывает контент у каждого таба
            item.classList.remove('show', 'fade');         // удаляем классы отображения и анимации
        });

        tabs.forEach(tab => {                               //перебираем каждый таб по отдельности
            tab.classList.remove(activeClass); // и если на каком-то назначен класс активности, то убираем его.
        });
    }

    function showTabContent(i = 0) {  //функция показа. изначально активен тот, у к-ого индекс 0. т.е. 1ый эл-нт
        tabsContent[i].classList.add('show', 'fade'); //контент таба с инд i, станет видимым
        tabsContent[i].classList.remove('hide');      // удаляет класс скрытия контента с инд i
        tabs[i].classList.add(activeClass);  // табу с инд i назначается класс активности
    }

    hideTabContent();  //  вызывает ф-цию скрытие элементов
    showTabContent();  //  вызывает ф-цию показа эл-тов, но т.к. без аргумента - знач по умолч i = 0

    tabsParent.addEventListener('click', (e) => {   // делегирование события, назначаем клик на родителя табов, листенер следит событием и записывает все в ивент
        const target = e.target;                    // для удобства

        if (target && target.classList.contains(tabsSelector.slice(1))) { // если таргет эвента И таргет эвента совпадает с селектором tabheader__item (slice удалит .)
            tabs.forEach((item, i) => {                               // то перебираем все элементы и их индексы
                if (target == item) {                                 // если тот таб куда нажали совпал с элементом, к-ый перебираем 
                    hideTabContent();                                 // то скрываем всех(на случай если кто-то уже был активен)
                    showTabContent(i);                                // и показываем только того, на кого кликнули.
                }
            });
        }
    });
}

export default tabs;