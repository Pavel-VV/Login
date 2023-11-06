import axios from '../plugins/axios';
import API_ENV from '../config/api.config';

export async function getCountries(){
    try{
        const response = await axios(`${API_ENV.countriesCitiesUrl}/countries`);
        // console.log(response);
        return response;
    }catch(err){
        return Promise.reject(err);
    };
};