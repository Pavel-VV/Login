import axios from 'axios';
import API_ENV from '../config/api.config';

import { loginServer } from './auth.server';

// Правильная функция, но поскольку сервер не отвечает, сделаю вызов функции которая будет проверять логин и пароль, и если совпадает, возвращать true
/**
 * Function login.
 * @param {string} email 
 * @param {string} password 
 */
// export async function login(email, password) {
//     try{   
//         console.log(email, password)
//         const response = await axios.post(`${API_ENV.apiUrl}/auth/login`, JSON.stringify({email, password}), {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         },);

//         console.log(response);
//         return response.data;
//     } catch(err) {
//         console.log(err);
//         return Promise.reject(err);
//     };
// };

// //////////////////////////////////////////////////

export async function login(email, password) {
    try{   
        console.log(email, password)
        const response = loginServer({email, password}); // эмулирую отправку данных на сервер, получаю или true или false

        return response;
    } catch(err) {
        console.log(err);
        return Promise.reject(err);
    };
};

