//  ф-ция отвечающая за функционал сервера POST запросы
const postData = async (url, data) => {
    const res = await fetch(url, {                    //  создается запрос к серверу (асинхронный код) поэтому применяем async/await
        method: "POST",                               //  теперь переменная res будет ждать ответа (промиса) от fetch и только после этого
        body: data
    });

    return res;
};

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

export {postData};
export {getResource};