import axios from '../plugins/axios';

import { loginServer } from './auth.server'; // импорт сервера заглушки, вместо неотвечающего реального сервера


////////////////////////////////////////////////////////////////


// Правильная функция, но поскольку сервер не отвечает, сделаю вызов функции которая будет проверять логин и пароль, и если совпадает, возвращать true
/**
 * Function login.
 * @param {string} email 
 * @param {string} password 
 */
// export async function login(email, password) {
//     try{   
//         console.log(email, password)
//         const response = await axios.post(`/auth/login`, JSON.stringify({email, password}));

//         console.log(response);
//         return response;
//     } catch(err) {
//         console.log(err);
//         return Promise.reject(err);
//     };
// };

// //////////////////////////////////////////////////

export async function login(inputs) {
    const [email, password] = inputs;
    try{   
        // console.log(email, password)
        const response = loginServer({email, password}); // эмулирую отправку данных на сервер, получаю или true или false

        return response;
    } catch(err) {
        console.log(err);
        return Promise.reject(err);
    };
};

