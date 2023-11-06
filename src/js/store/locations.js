import { getCountries } from '../services/countries.service';
import { getCities } from '../services/cities.service';

const dataLocations = {
    countries: null,
    cities: null,
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



// сделать serializeCities где ключем будет 