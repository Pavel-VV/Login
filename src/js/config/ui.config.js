const UI = {
    // form: document.form('loginForm'),
    form: document.forms['loginForm'],
    inputEmail: document.getElementById('email'),
    inputPassword: document.getElementById('password'),
};
console.log(UI.form)
export default UI;