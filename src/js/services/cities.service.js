import axios from '../plugins/axios';
import API_ENV from '../config/api.config';

export async function getCities() {
    try{
        const response = await axios(`${API_ENV.countriesCitiesUrl}/cities`);
        // console.log(response);
        return response;
    }catch(err) {
        return Promise.reject(err);
    }
}