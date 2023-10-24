// данные аккаунта на сервере для авторизации
const validData = {
    email: 'denis.m.pcspace@gmail.com',
    password: 'dmgame12345'
}

/**
 * function loginServer. Функция проверки введенныйх данных через форму с данными на сервере
 * @param {Object} object 
 * @param {String} object.email
 * @param {String} object.password
 * @returns boolean
 */
export function loginServer({email, password}) {
    
    const promise = new Promise((resolve, reject) => {
        if(email === validData.email && password === validData.password){
            resolve(true);
        }else reject(false);
    });
    return promise;
}