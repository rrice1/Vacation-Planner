import axios from 'axios';
import apiKeys from '../apiKeys';

const countryInfo = apiKeys.countryApi.countryStuff;

const getCountry = getFunCountry => new Promise((resolve, reject) => {
  axios.get(`https://www.numbeo.com/api/country_prices?api_key=${countryInfo}&country=Kuwait`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

export default {
  getCountry,
};
