import React from 'react';
import './TripPage.scss';
import tripRequest from '../../../helpers/data/tripRequest';
import TripList from '../TripList/TripList';
import TripForm from '../TripForm/TripForm';

class tripPage extends React.Component {
state= {
  trips: [],
  authed: false,
  isEditing: false,
  editId: '-1',
}

componentDidMount() {
  tripRequest.getTripData()
    .then((trips) => {
      this.setState({ trips });
    })
    .catch(err => console.error('error with listing GET', err));
}

updateTrip = (tripId, isCompleted) => {
  tripRequest.updateBlog(tripId, isCompleted)
    .then(() => {
      tripRequest.getBlogData()
        .then((trips) => {
          trips.sort((x, y) => x.isCompleted - y.isCompleted);
          this.setState({ trips });
        });
    })
    .catch(err => console.error(err));
}

deleteTrip = (tripId) => {
  tripRequest.deleteTripData(tripId)
    .then(() => {
      tripRequest.getTripData()
        .then((trips) => {
          this.setState({ trips });
        });
    })
    .catch(err => console.error(err));
}

render() {
  const {
    trips,
    isEditing,
    editId,
  } = this.state;

  return (
    <div>
      <div className="row">
        <TripList
          trips={trips}
          deleteSingleTrip={this.deleteOne}
          passTripToEdit={this.passTripToEdit}
        />
      </div>
    </div>
  );
}
}

export default tripPage;
