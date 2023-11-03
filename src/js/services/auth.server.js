// данные аккаунта на сервере для авторизации
const validData = {
    email: 'denis.m.pcspace@gmail.com',
    password: 'dmgame12345'
}

const validationKeys = ['email', 'password', 'nickname', 'first_name', 'last_name', 'phone', 'gender', 'city', 'country', 'date_of_birth'];

const addNewUser = [];

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
};

/**
 * 
 * @param {Object} userData 
 * @returns 
 */
export function regServer(userData) {
    const promise = new Promise((resolve, reject) => {
        const userKeys = Object.keys(userData); // переводим объект передаваемых данных в массив ключей
        let resoultValidationUserKey; // переменная результат проверки ключей объекта, с требуемыми ключами на сервере validationKeys
        validationKeys.forEach(keyValid => { // перебираем требуемые ключи сервера
            const resoult = userKeys.some(keyUser => { // сравниваем каждый ключ пришедшего юзера с ключем требуемым сервером
                return keyUser === keyValid;
                
            })
            if (!resoult) return resoultValidationUserKey = false; // если хотя бы одного ключа нет, то в переменную resoultValidationUserKey записываем false
            resoultValidationUserKey = true;
        });
        if(resoultValidationUserKey) {
            const resoultNewUser = addNewUser.some(user => { //перебираю всех сохраненных пользователей на сервере сохраненные в json формате с новым пользователем, предварительно переведя его в json формат
                console.log(addNewUser, user)
                return JSON.stringify(user) === JSON.stringify(userData);
                
                
            });
            console.log(resoultNewUser)
            if(resoultNewUser) return // если нашлось совпадение среди сохраненных пользователей, прекращаем дальнейший код, если совпадений небыло, то переводим нового пользователя в json и добавляем в массив пользователей
            
            addNewUser.push(JSON.parse(JSON.stringify(userData))); // записываю объекты в json формате в массив для того чтоб можно было сравнивать, не добавился ли точно такой же пользователь
            console.log(addNewUser)
            resolve({
                error: false,
                auth: true,
                token: Math.random(),
            });
        } else reject(false);
    });
    return promise;
};