const UI = {
    // form: document.form('loginForm'),
    forms: document.forms,
    inputEmail: document.getElementById('email'),
    inputPassword: document.getElementById('password'),
    inputEmailAuth: document.getElementById('emailAuth'),
    inputPasswordAuth: document.getElementById('passwordAuth'),
    inputFirstName: document.getElementById('first-name'),
    inputLastName: document.getElementById('last-name'),
    inputNickname: document.getElementById('nickname'),
    inputGender: document.getElementById('gender'),
    inputDateOfBirth: document.getElementById('date-of-birth'),
    inputPhone: document.getElementById('phone'),
    inputCountry: document.getElementById('country'),
    inputCity: document.getElementById('city')
};
// console.log(UI.inputFirstName);
// const allForms = [...UI.forms];
// console.log(allForms);
export default UI;