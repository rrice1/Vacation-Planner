import React from 'react';
import './TripPage.scss';
import tripRequest from '../../../helpers/data/tripRequest';
import TripList from '../TripList/TripList';

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

updateTrip = (tripId) => {
  tripRequest.updateTrip(tripId)
    .then(() => {
      tripRequest.getTripData()
        .then((trips) => {
          this.setState({ trips });
        });
    })
    .catch(err => console.error(err));
}

deleteOne = (tripId) => {
  tripRequest.deleteTripData(tripId)
    .then(() => {
      tripRequest.getTripData()
        .then((trips) => {
          this.setState({ trips });
        });
    })
    .catch(err => console.error('error with delete single', err));
}

passTripToEdit = tripId => this.props.history.push(`/trips/${tripId}/edit`)

render() {
  const {
    trips,
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
