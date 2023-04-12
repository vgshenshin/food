# food
Учебный проект на чистом JavaScript


В проекте (ветка main) был использован json-server для рендера карточек 'Наше меню на день'.
Для того чтобы карточки рендерились на локальном сервере, в консоли необходимо выполнить команду:
    json-server db.json

Для того чтобы карточки рендерились в GitHub Pages использовал Google Sheet как базу данных (ветка deploy). 
Через Apps Scripts в Google Sheet сделал вывод данных в формате JSON.

Ссылка на таблицу: https://docs.google.com/spreadsheets/d/1wYufrqBgTqvFHzCDADVXFEpe71EQd-yNb8B7f9X3mzc/edit?usp=sharing

Для хранения данных с формы обратной связи использовал Google Sheet (ветка deploy).
Через Apps Scripts в Google Sheet сделал функцию POST, которая принимает и преобразует данные, затем записывает их в таблицу по порядку.

Ссылка на таблицу: https://docs.google.com/spreadsheets/d/105nMthcz0-Ghz3cL6BjCNDoVyf1i6A9ZBrEXeUvdCE0/edit?usp=sharing