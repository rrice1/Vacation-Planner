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

const deleteTripData = tripId => axios.delete(`${firebaseUrl}/vacation/${tripId}.json`);

const postTrip = trip => axios.post(`${firebaseUrl}/vacation.json`, trip);

const updateTrip = (tripId, isCompleted) => axios.patch(`${firebaseUrl}/trip/${tripId}.json`, { isCompleted });

export default {
  getTripData,
  deleteTripData,
  postTrip,
  updateTrip,
};
