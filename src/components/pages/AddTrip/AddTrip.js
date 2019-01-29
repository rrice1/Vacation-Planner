import React from 'react';
import './AddTrip.scss';
import TripForm from '../TripForm/TripForm';
import tripRequest from '../../../helpers/data/tripRequest';

class AddTrip extends React.Component {
  formSubmitEvent = (newTrip) => {
    tripRequest.postTrip(newTrip)
      .then(() => {
        tripRequest.getTripData()
          .then((trips) => {
            this.props.history.push('/trips');
          });
      })
      .catch(err => console.error('error with listings post', err));
  }

  passTripToEdit = tripId => this.setState({ isEditing: true, editId: tripId });

  render() {
    return (
      <div>
      <h2>AddTrip Component</h2>
      <div className="row">
        <TripForm onSubmit={this.formSubmitEvent} />
      </div>
      </div>
    );
  }
}

export default AddTrip;
