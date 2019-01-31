import PropTypes from 'prop-types';

const funPropz = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  vacationName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  inexpensiveRestaurant: PropTypes.number.isRequired,
  threeCourseMeal: PropTypes.number.isRequired,
  domesticBeer: PropTypes.number.isRequired,
  waterBottles: PropTypes.number.isRequired,
  gasConsumed: PropTypes.number.isRequired,
  localTransportationOneWay: PropTypes.number.isRequired,
  bananas: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
});

export default funPropz;
