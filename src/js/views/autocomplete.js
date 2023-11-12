import dataLocations from '../store/locations';

const inputEl = document.querySelector('[data-autocomplete]'); // находим инпут после которого будет создаваться autocomplete

export function autocomplete() {
    
    // console.log(ulList)

    inputEl.addEventListener('input', onInputChange); // добавляем список после найденого инпута



}

function onInputChange(e) { // фукция генерации элементов autocomplete
    const countries = dataLocations.countriesNamesList;
    const cities = dataLocations.citiesNamesList;
    
    onInputRemove(); // при вводе каждого нового символа, удалять ранее созданный список
    const ulList = document.createElement('ul'); // создаем список
    ulList.className = 'autocomplete-list';
    inputEl.insertAdjacentElement('afterend', ulList);

    const input = e.target;
    const inputValue = (input.value).toLowerCase();
    // console.log(inputValue);
    if(inputValue.length === 0) return;
    countries.forEach(elem => {
        if (elem.substring(0, inputValue.length).toLowerCase() === inputValue) {
            const liEl = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = elem;
            liEl.appendChild(btn);
            ulList.appendChild(liEl);
        };
    });
    pressOnButtonAutocomplete(input);
};

function onInputRemove() {
    const ulList = document.querySelector('.autocomplete-list');
    if(!ulList) return;
    
    ulList.remove();
};

function pressOnButtonAutocomplete(input) {
    const buttons = document.querySelectorAll('.autocomplete-list > li > button')
    buttons.forEach( button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            input.value = button.textContent;
            const inputCity = document.querySelector('#city');
            inputCity.disabled = false;
            onInputRemove();
        })
    })
}