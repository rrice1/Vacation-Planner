import React from 'react';
import './AddTrip.scss';
import TripForm from '../TripForm/TripForm';
import tripRequest from '../../../helpers/data/tripRequest';

class AddTrip extends React.Component {
  state= {
    trips: [],
    authed: false,
    isEditing: false,
    editId: '-1',
  }

  formSubmitEvent = (newTrip) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      tripRequest.putRequest(editId, newTrip)
        .then(() => {
          tripRequest.getTripData()
            .then((trips) => {
              this.setState({ trips, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } else {
      tripRequest.postTrip(newTrip)
        .then(() => {
          tripRequest.getTripData()
            .then((trips) => {
              this.setState({ trips });
            });
        })
        .catch(err => console.error('error with listings post', err));
    }
  }

  passTripToEdit = tripId => this.setState({ isEditing: true, editId: tripId });

  render() {
    const {
      trips,
      isEditing,
      editId,
    } = this.state;

    return (
      <div>
      <h2>AddTrip Component</h2>
      <div className="row">
        <TripForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
      </div>
      </div>
    );
  }
}

export default AddTrip;
