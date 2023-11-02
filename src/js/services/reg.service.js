import axios from '../plugins/axios';

import { regServer } from './auth.server';


/**
 * 
 * @param {Object} user 
 * @returns 
 */
// export async function reg(user) { // функция не работает так как не работает запрос на сервер, внизу сделаю функцию эмулятор
//     try{
//         const response = await axios.post('/auth/signup', JSON.stringify(user));
//         return response;
//     }catch(err) {
//         return Promise.reject(err)
//     };
// };


export function reg(user) {
    try{
        const response = regServer(user);
        return response;

    }catch(err) {
        return Promise.reject(err);
    };
};