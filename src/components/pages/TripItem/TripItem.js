import React from 'react';
import PropTypes from 'prop-types';

import tripShape from '../../../helpers/propz/funPropz';
import authRequests from '../../../helpers/data/authRequests';

import './TripItem.scss';

class TripItem extends React.Component {
  static propTypes = {
    // trip: tripShape.tripShape,
    deleteSingleTrip: PropTypes.func,
    passTripToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTrip, trip } = this.props;
    deleteSingleTrip(trip.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTripToEdit, trip } = this.props;
    passTripToEdit(trip.id);
  }

  render() {
    const { trip } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (trip.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="trip-item text-center" onClick={this.tripClick}>
        <span className="col-7">{trip.vacationName}</span>
        {makeButtons()}
      </li>
    );
  }
}

export default TripItem;
