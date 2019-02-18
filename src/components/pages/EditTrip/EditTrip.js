import React from 'react';
import TripForm from '../TripForm/TripForm';
import tripRequest from '../../../helpers/data/tripRequest';
import './EditTrip.scss';

class EditTrip extends React.Component {
  state = {
    trip: {},
  }

  formSubmitEvent = (newTrip) => {
    const tripId = this.props.match.params.id;
    tripRequest.updateTrip(tripId, newTrip)
      .then(() => {
        tripRequest.getTripData()
          .then((trips) => {
            this.props.history.push('/trips');
          });
      })
      .catch(err => console.error('error with listings post', err));
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    tripRequest.getSingleTrip(tripId)
      .then((trip) => {
        this.setState({ trip: trip.data });
      })
      .catch(err => console.error('error with getSingleListing', err));
  }

  render() {
    return (
      <div>
      <div className="row">
        <TripForm onSubmit={this.formSubmitEvent} trip={this.state.trip} />
      </div>
      </div>
    );
  }
}

export default EditTrip;
