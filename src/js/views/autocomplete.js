import dataLocations from '../store/locations';

const inputEl = document.querySelector('[data-autocomplete]'); // находим инпут после которого будет создаваться autocomplete

export function autocomplete() {
    const countries = dataLocations.countriesNamesList;
    const cities = dataLocations.citiesNamesList;


    const ulList = document.createElement('ul'); // создаем список
    ulList.className = 'autocomplete-list';
    inputEl.insertAdjacentElement('afterend', ulList);
    // console.log(ulList)

    inputEl.addEventListener('input', onInputChange); // добавляем список после найденого инпута

function onInputChange(e) { // фукция генерации элементов autocomplete
    const input = e.target;
    console.log(input.value);

    const liEl = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = '123'
    liEl.appendChild(btn);
    ulList.appendChild(liEl);
    
}
}

