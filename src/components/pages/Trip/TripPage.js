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

formSubmitEvent = (newTrip) => {
  const { isEditing, editId } = this.state;
  if (isEditing) {
    tripRequest.updateTrip(editId, newTrip)
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
      <div className="row">
        <TripList
          trips={trips}
          deleteSingleTrip={this.deleteOne}
          passTripToEdit={this.passTripToEdit}
        />
        <div className="row">
        <TripForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
      </div>
      </div>
    </div>
  );
}
}

export default tripPage;
