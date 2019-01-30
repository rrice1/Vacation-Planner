import axios from 'axios';
import apiKeys from '../apiKeys';

const countryInfo = apiKeys.countryApi.countryStuff;
const exchangeRateNumber = apiKeys.priceApi.exchangeRates;

const getCountryData = getFunCountry => new Promise((resolve, reject) => {
  axios.get(`https://www.numbeo.com/api/country_prices?api_key=${countryInfo}&country=${getFunCountry}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

const getRate = getCurrency => new Promise((resolve, reject) => {
  axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${getCurrency}&to_currency=USD&apikey=${exchangeRateNumber}`)
    .then((result) => {
      resolve(result.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    })
    .catch(err => reject(err));
});

export default {
  getCountryData,
  getRate,
};
