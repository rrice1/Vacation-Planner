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
    tripRequest.postRequest(newTrip)
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
      <h2>AddTrip Component</h2>
      <div className="row">
        <TripForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
      </div>
      </div>
    );
  }
}

export default AddTrip;
