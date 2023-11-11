import { getCountries } from '../services/countries.service';
import { getCities } from '../services/cities.service';

const dataLocations = {
    countries: null, // объект с объектами key: country Name,  value: object(country)
    cities: null, // array object(city)
    countriesNamesList: null, // массив имен стран для автокомплита инпута Country
    citiesNamesList: [], // массив имен городов по коду страны для автокомплита инпута City
};

export async function init() {
    const response = await Promise.all([getCountries(), getCities()]);
    const [countries, cities] = response;
    // [dataLocation.countries, dataLocation.cities] = response;
    dataLocations.countries = serializeCountries(countries);
    dataLocations.cities = cities;
    // console.log(dataLocations.countries, cities);
};

function serializeCountries(countries) {
    return countries.reduce((acc, country) => {
        acc[country.name || country.name_translations.en] = country;
        return acc;
    }, {})
}

export function getCountriesNames() {
    dataLocations.countriesNamesList = Object.keys(dataLocations.countries);
    // console.log(dataLocations.countriesNamesList);
}

export function getCitiesNameByCountryName(countryName) {
    const countryCode = dataLocations.countries[countryName].code; // находим код страны по имени страны
    const citiesByCountryCode = dataLocations.cities.filter(elem => { // находим все города по коду страны
        return elem.country_code === countryCode;
    });
    dataLocations.citiesNamesList = []; // очищаем предыдущий массив городов
    citiesByCountryCode.forEach(city => { // перебираем массив отфильтрованных городов
        dataLocations.citiesNamesList.push(city.name || city.name_translations.en); // создаем массив имен городов
    });
    // console.log(dataLocations.citiesNameList);
}

export default dataLocations;