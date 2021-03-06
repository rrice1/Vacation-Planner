import React from 'react';
import PropTypes from 'prop-types';

import tripShape from '../../../helpers/propz/funPropz';
import authRequests from '../../../helpers/data/authRequests';

import './TripItem.scss';

class TripItem extends React.Component {
  static propTypes = {
    trip: tripShape,
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
    if (trip.uid === uid) {
      return (
      <div className="trip-item text-center border" onClick={this.tripClick}>
        <span className="funClass">Trip Name:</span>
        <span className="col-7">{trip.vacationName}</span>
        <span className="funClass">Country:</span>
        <span className="col-7">{trip.country}</span>
        <span className="funClass">Trip Duration:</span>
        <span className="col-7">{trip.startDate} - {trip.endDate}</span>
        <div>
        <span className="funClass">Estimated Trip Cost:</span>
        <span className="col-7"> {trip.finalCost} {trip.currency}</span>
        <span className="funClass">which is the equivalent of</span>
        <span className="col-7">{trip.finalCostExchange} {trip.currency2}</span>
        </div>
        {makeButtons()}
      </div>
      );
    }
    return <span className="col-2"></span>;
  }
}

export default TripItem;
