<?php
$_POST = json_decode(file_get_contents("php://input"), true); // для отправки JSON в server.php необходимо добавить
echo var_dump($_POST);/* команда позволяет увидеть те данные к-ые приходят с клиента, 
берет те данные к-ые пришли с клиента и превращает их в строку и показывает их обратно на клиенте */