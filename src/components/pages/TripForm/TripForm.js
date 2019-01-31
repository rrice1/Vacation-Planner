import React from 'react';
import PropTypes from 'prop-types';
import './TripForm.scss';
import authRequests from '../../../helpers/data/authRequests';
import getApiData from '../../../helpers/data/apiRequest';

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
  finalCost: 0,
  finalCostExchange: 0,
  startDate: '',
  currency: '',
  uid: '',
};

class TripForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
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

  startDateChange = e => this.formFieldStringState('startDate', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myTrip = { ...this.state.newTrip };
    myTrip.uid = authRequests.getCurrentUid();
    this.setState({ newTrip: defaultTrip });
    getApiData.getCountryData(this.state.newTrip.country)
      .then((country) => {
        myTrip.country = country.name;
        myTrip.finalCost = (myTrip.inexpensiveRestaurant * country.prices[0].average_price) + (myTrip.threeCourseMeal * country.prices[1].average_price) + (myTrip.domesticBeer * Math.round(country.prices[13].average_price)) + (myTrip.waterBottles * Math.round(country.prices[11].average_price)) + (myTrip.gasConsumed * Math.round(country.prices[19].average_price)) + (myTrip.localTransportationOneWay * Math.round(country.prices[16].average_price)) + (myTrip.bananas * Math.round(country.prices[52].average_price));
        myTrip.currency = country.currency;
        getApiData.getRate(myTrip.currency)
          .then((rate) => {
            console.log('rate:', rate);
            console.log(Math.round((myTrip.finalCost * rate)));
            myTrip.finalCostExchange = Math.round((myTrip.finalCost * rate));
            onSubmit(myTrip);
          })
          .catch(err => console.error(err));
        console.log(getApiData.getRate(myTrip.currency)['Realtime Currency Exchange Rate']);
        console.log(getApiData.getRate(myTrip.currency));
        console.log(myTrip.finalCost);
        console.log(country.prices[0].average_price);
        console.log(myTrip.country);
        console.log(getApiData.getCountryData(country.name));
      })
      .catch(err => console.error(err));
  }

  // componentDidMount() {
  //   this.setState({ newTrip: defaultTrip });
  // }

  componentDidUpdate(prevProps) {
    const { trip } = this.props;
    // if (prevProps !== this.props && Object.keys(trip).length) {
    if (prevProps !== this.props && trip) {
      this.setState({ newTrip: trip });
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
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              aria-describedby="startDateHelp"
              placeholder="01/12/2019"
              value={newTrip.startDate}
              onChange={this.startDateChange}
            />
          </div>
          <button className="btn btn-danger">Save Trip</button>
        </form>
      </div>
    );
  }
}

export default TripForm;
