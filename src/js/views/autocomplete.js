import {getCitiesNamesByCountryName} from '../store/locations';

// const inputCountries = document.querySelector('[data-autocomplete-countries]'); // находим инпут после которого будет создаваться autocomplete
// const inputCities = document.querySelector('[data-autocomplete-cities]');

// export function autocomplete(dataLocationsq) {
    
//     const countries = dataLocationsq.getCountriesNamesList.bind(dataLocationsq);
//     const cities = dataLocationsq.getCitiesNamesList.bind(dataLocationsq);
//     // console.log(countries())

//     inputCountries.addEventListener('input', onInputChange(countries(), inputCountries, inputCities)); // добавляем список после найденого инпута (если передаю третий аргумент, в виде инпута, то разблокируется переданный input)
//     inputCities.addEventListener('input', onInputChange(cities(), inputCities));
// };

/**
 * 
 * @param {Array} list 
 * @param {HTMLElement} inputEl 
 * @param {HTMLElement} unblockInput 
 * @returns
 */
export function onInputChange(getList, inputEl, unblockInput = false) { // фукция генерации элементов autocomplete
    return (e) => { // нужна функция высшего порядка, чтоб ы можно было в обработчик события передать данные кроме event
        onInputRemove(); // при вводе каждого нового символа, удалять ранее созданный список
        const list = getList();
        const divList = document.createElement('div'); // убрал все в div блок, чтобы реализовать скролинг автокомплита
        divList.className = 'autocomplete-block';
        const ulList = document.createElement('ul'); // создаем список
        ulList.className = 'autocomplete-list';
        divList.appendChild(ulList);
        inputEl.insertAdjacentElement('afterend', divList);

        const inputValue = (inputEl.value).toLowerCase();
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
    const divList = document.querySelector('.autocomplete-block');
    if(!divList) return;
    divList.remove();
    // const ulList = document.querySelector('.autocomplete-list');
    // if(!ulList) return;
    
    // ulList.remove();
};

function pressOnButtonAutocomplete(input, unblockInput) {
    const buttons = document.querySelectorAll('.autocomplete-list > li > button')
    buttons.forEach( button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            input.value = button.textContent;
            
            if(unblockInput) {
                unblockInput.disabled = false; // получаю в переменной unblockInput input который нужно разблокировать
                getCitiesNamesByCountryName(button.textContent); // вызов функции формирования массива городов, при нажатии кнопки
            }
            onInputRemove();
        })
    })
};
