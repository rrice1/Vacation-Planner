import React from 'react';
import PropTypes from 'prop-types';
import tripShape from '../../../helpers/propz/funPropz';
import TripItem from '../TripItem/TripItem';
import './TripList.scss';

class TripList extends React.Component {
  static propTypes = {
    trips: PropTypes.arrayOf(tripShape),
    deleteSingleTrip: PropTypes.func,
    passTripToEdit: PropTypes.func,
  }

  render() {
    const {
      trips,
      deleteSingleTrip,
      passTripToEdit,
    } = this.props;
    const tripsItemComponents = trips.map(trip => (
      <TripItem
        trip={trip}
        key={trip.id}
        deleteSingleTrip={deleteSingleTrip}
        passTripToEdit={passTripToEdit}
      />
    ));
    return (
      <div className="listings col">
        <h2>Your Trips</h2>
        <div>{tripsItemComponents}</div>
      </div>
    );
  }
}

export default TripList;
