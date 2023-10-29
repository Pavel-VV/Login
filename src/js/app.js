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

const {form, inputEmail, inputPassword} = UI;

const inputs = [inputEmail, inputPassword];

//events
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('hi')
    onSubmit(inputs);
});

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));


//handlers
async function onSubmit(inputs) {
    const isValidForm = inputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);

        };
        return isValidInput;
    });

    if(!isValidForm) return;

    try{
        const result = await login(inputEmail.value, inputPassword.value)
        // await getNews(); // не работает так как не могу получит токен от сервера, он не отвечает
        console.log(result);
        notify({ msg: 'autorisation success', className: 'alert-success', timeout: 3000 });
    }catch(err) {
        console.log(err)
        notify({ msg: 'autorisation folse', className: 'alert-danger', timeout: 3000 })
    }
    

    // console.log(isValidForm);

}