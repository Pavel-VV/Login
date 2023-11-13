import dataLocations from '../store/locations';

const inputCountries = document.querySelector('[data-autocomplete-countries]'); // находим инпут после которого будет создаваться autocomplete
const inputCities = document.querySelector('[data-autocomplete-cities]');

export function autocomplete() {
    const countries = dataLocations.countriesNamesList;
    const cities = dataLocations.citiesNamesList;

    inputCountries.addEventListener('input', onInputChange(countries, inputCountries, true)); // добавляем список после найденого инпута (если передаю true, разблокируется input City)
    inputCities.addEventListener('input', onInputChange(cities, inputCities));
};

function onInputChange(list, inputEl, unblockInput = false) { // фукция генерации элементов autocomplete
    return e => { // нужна функция высшего порядка, чтоб ы можно было в обработчик события передать данные кроме event
        onInputRemove(); // при вводе каждого нового символа, удалять ранее созданный список
        
        const ulList = document.createElement('ul'); // создаем список
        ulList.className = 'autocomplete-list';
        inputEl.insertAdjacentElement('afterend', ulList);

        const inputValue = (inputEl.value).toLowerCase();
        // console.log(inputValue);
        if(inputValue.length === 0) return;
        list.forEach((elem) => {
            if (elem.substring(0, inputValue.length).toLowerCase() === inputValue) {
                const liEl = document.createElement('li');
                const btn = document.createElement('button');
                btn.textContent = elem;
                liEl.appendChild(btn);
                ulList.appendChild(liEl);
            };
        });
        pressOnButtonAutocomplete(inputEl, unblockInput);
    }
};

function onInputRemove() {
    const ulList = document.querySelector('.autocomplete-list');
    if(!ulList) return;
    
    ulList.remove();
};

function pressOnButtonAutocomplete(input, unblockInput) {
    const buttons = document.querySelectorAll('.autocomplete-list > li > button')
    buttons.forEach( button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            input.value = button.textContent;
            const inputCity = document.querySelector('#city');
            if(unblockInput) inputCity.disabled = false;
            onInputRemove();
        })
    })
};
