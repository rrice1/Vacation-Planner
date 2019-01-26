import React from 'react';
import PropTypes from 'prop-types';
import './TripForm.scss';
import authRequests from '../../../helpers/data/authRequests';
import tripRequest from '../../../helpers/data/tripRequest';

const defaultTrip = {
  vacationName: '',
  country: '',
  inexpensiveRestaurant: 0,
  threeCourseMeal: 0,
  domesticBeer: 0,
  waterBottles: 0,
  gasConsumed: 0,
  localTransportationOneWay: 0,
  bananas: 0,
  uid: '',
};

class TripForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newTrip: defaultTrip,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value;
    this.setState({ newTrip: tempTrip });
  }

  formFieldNumberState = (name, e) => {
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value * 1;
    this.setState({ newTrip: tempTrip });
  }

  vacationNameChange = e => this.formFieldStringState('vacationName', e);

  countryChange = e => this.formFieldStringState('country', e);

  inexpensiveRestaurantChange = e => this.formFieldNumberState('inexpensiveRestaurant', e);

  threeCourseMealChange = e => this.formFieldNumberState('threeCourseMeal', e);

  domesticBeerChange = e => this.formFieldNumberState('domesticBeer', e);

  waterBottlesChange = e => this.formFieldNumberState('waterBottles', e);

  gasConsumedChange = e => this.formFieldNumberState('gasConsumed', e);

  localTransportationOneWayChange = e => this.formFieldNumberState('localTransportationOneWay', e);

  bananasChange = e => this.formFieldNumberState('bananas', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myListing = { ...this.state.newTrip };
    myListing.uid = authRequests.getCurrentUid();
    onSubmit(myListing);
    this.setState({ newTrip: defaultTrip });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      tripRequest.getSingleTrip(editId)
        .then((trip) => {
          this.setState({ newTrip: trip.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newTrip } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Trip:</h2>;
      }
      return <h2>Add New Trip:</h2>;
    };
    return (
      <div className="trip-form col">
        {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="vacationName">Vacation Name:</label>
            <input
              type="text"
              className="form-control"
              id="vacationName"
              aria-describedby="vacationNameHelp"
              placeholder="Morocco Trip"
              value={newTrip.vacationName}
              onChange={this.vacationNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              className="form-control"
              id="country"
              aria-describedby="countryHelp"
              placeholder="Morocco"
              value={newTrip.country}
              onChange={this.countryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inexpensiveRestaurant">Inexpensive Restaurant:</label>
            <input
              type="number"
              className="form-control"
              id="inexpensiveRestaurant"
              aria-describedby="inexpensiveRestaurantHelp"
              placeholder="Tropical Smoothie Cafe"
              value={newTrip.inexpensiveRestaurant}
              onChange={this.inexpensiveRestaurantChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="threeCourseMeal">Three Course Meal:</label>
            <input
              type="number"
              className="form-control"
              id="threeCourseMeal"
              aria-describedby="threeCourseMealHelp"
              placeholder="4"
              value={newTrip.threeCourseMeal}
              onChange={this.threeCourseMealChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="domesticBeer">Domestic Beer:</label>
            <input
              type="number"
              className="form-control"
              id="domesticBeer"
              aria-describedby="domesticBeerHelp"
              placeholder="2"
              value={newTrip.domesticBeer}
              onChange={this.domesticBeerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="waterBottles">Water Bottles:</label>
            <input
              type="number"
              className="form-control"
              id="waterBottles"
              aria-describedby="waterBottlesHelp"
              placeholder="12"
              value={newTrip.waterBottles}
              onChange={this.waterBottlesChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gasConsumed">Gas Consumed:</label>
            <input
              type="number"
              className="form-control"
              id="gasConsumed"
              aria-describedby="gasConsumedHelp"
              placeholder="7"
              value={newTrip.gasConsumed}
              onChange={this.gasConsumedChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="localTransportationOneWay">Local Transportation One Way:</label>
            <input
              type="number"
              className="form-control"
              id="localTransportationOneWay"
              aria-describedby="localTransportationOneWayHelp"
              placeholder="5"
              value={newTrip.localTransportationOneWay}
              onChange={this.localTransportationOneWayChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bananas">Bananas:</label>
            <input
              type="number"
              className="form-control"
              id="bananas"
              aria-describedby="bananasHelp"
              placeholder="6"
              value={newTrip.bananas}
              onChange={this.bananasChange}
            />
          </div>
          <button className="btn btn-danger">Save Trip</button>
        </form>
      </div>
    );
  }
}

export default TripForm;
