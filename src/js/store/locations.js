import { getCountries } from '../services/countries.service';
import { getCities } from '../services/cities.service';

const dataLocations = {
    countries: null, // объект с объектами key: country Name,  value: object(country)
    cities: null, // array object(city)
    countriesNamesList: null, // массив имен стран для автокомплита инпута Country
    citiesNameList: [], // массив имен городов по коду страны для автокомплита инпута City
};

export async function init() {
    const response = await Promise.all([getCountries(), getCities()]);
    const [countries, cities] = response;
    // [dataLocation.countries, dataLocation.cities] = response;
    dataLocations.countries = serializeCountries(countries);
    dataLocations.cities = cities;
    console.log(dataLocations.countries, cities);
};

function serializeCountries(countries) {
    return countries.reduce((acc, country) => {
        acc[country.name || country.name_translations.en] = country;
        return acc;
    }, {})
}

export function getCountriesNames() {
    dataLocations.countriesNamesList = Object.keys(dataLocations.countries);
    console.log(dataLocations.countriesNamesList);
}

export function getCountryCodeByName(countryName) { // вставить имя страны из инпута Country
    const countryCode = dataLocations.countries[countryName].code;
    console.log(countryCode);
}

export function getCitiesNameByCountryName(countryName) {
    const countryCode = dataLocations.countries[countryName].code; // находим код страны по имени страны
    const citiesByCountryCode = dataLocations.cities.filter(elem => { // находим все города по коду страны
        return elem.country_code === countryCode;
    });
    dataLocations.citiesNameList = []; // очищаем предыдущий массив городов
    citiesByCountryCode.forEach(city => { // перебираем массив отфильтрованных городов
        dataLocations.citiesNameList.push(city.name || city.name_translations.en); // создаем массив имен городов
    });
    console.log(dataLocations.citiesNameList);
}



// сделать serializeCities где ключем будет 