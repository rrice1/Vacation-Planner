import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getTripData = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/vacations.json`)
    .then((res) => {
      const trips = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          trips.push(res.data[key]);
        });
      }
      resolve(trips);
    })
    .catch(err => reject(err));
});

const deleteTripData = tripId => axios.delete(`${firebaseUrl}/vacations/${tripId}.json`);

const postTrip = trip => axios.post(`${firebaseUrl}/vacations.json`, trip);

const getSingleTrip = tripId => axios.get(`${firebaseUrl}/vacations/${tripId}.json`);

const updateTrip = (tripId, trip) => axios.patch(`${firebaseUrl}/vacations/${tripId}.json`, trip);

export default {
  getTripData,
  deleteTripData,
  postTrip,
  updateTrip,
  getSingleTrip,
};
