// export NODE_OPTIONS=--openssl-legacy-provider

// login denis.m.pcspace@gmail.com
// password dmgame12345

import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notification';
import { getNews } from './services/news.service';

const {forms,
    inputEmail,
    inputPassword,
    inputEmailAuth,
    inputPasswordAuth,
    inputFirstName,
    inputLastName,
    inputNickname,
    inputGender,
    inputDateOfBirth,
    inputPhone,
    inputCountry,
    inputCity
} = UI;

const inputs = [inputEmail, inputPassword, inputEmailAuth, inputPasswordAuth, inputFirstName, inputLastName, inputNickname, inputGender, inputDateOfBirth, inputPhone, inputCountry, inputCity];
const allForms = [...forms];
//events
allForms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        onSubmit(inputs, form);
    });
})


inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));


//handlers
let inputsValueFromForm = {}; // объект данных из импутов
async function onSubmit(inputs, form) {
    let submitForm; // форма с которой с которой произвели submit
    const isValidForm = inputs.every(el => {
        if(!(el.closest('form') === form)) return true; //перебираем все инпуты всех форм, если перебираемый элемент не равен передаваемой форме то, вернуть true, и цикл every продолжет перебирать элементы, есди будет равен, то код продолжится выполняться дальше, и этот инпут будет проверяться на правильность введенных данных
        submitForm = el.closest('form');
        inputsValueFromForm[el.dataset.required] = el.value;
        // console.log(submitForm);
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);

        };
        return isValidInput;
        
    });
    // console.log(inputsValueFromForm);

    if(!isValidForm) return;
    
    if(submitForm.name === 'loginForm'){ // если имя формы с которой отправляют данные равно 'loginForm' то выполнять запрос на login, если не т то на auth
        try{
            const result = await login(inputsValueFromForm);
            // const result = await login(inputEmail.value, inputPassword.value)
            // await getNews(); // не работает так как не могу получит токен от сервера, он не отвечает
            console.log(result);
            notify({ msg: 'autorisation success', className: 'alert-success', timeout: 3000 });
        }catch(err) {
            console.log(err)
            notify({ msg: 'autorisation folse', className: 'alert-danger', timeout: 3000 })
        };
    } else {
        console.log('form auth')
    }
    

    // console.log(isValidForm);

}   // написать эмулирование сервера регистрации