import React from 'react';
import './EditTrip.scss';

class EditTrip extends React.Component {

  // formSubmitEvent = (newTrip) => {
  //   const { isEditing, editId } = this.state;
  //   if (isEditing) {
  //     tripRequest.putRequest(editId, newTrip)
  //       .then(() => {
  //         tripRequest.getTripData()
  //           .then((trips) => {
  //             this.setState({ trips, isEditing: false, editId: '-1' });
  //           });
  //       })
  //       .catch(err => console.error('error with listings post', err));
  //   } else {
  //     tripRequest.postTrip(newTrip)
  //       .then(() => {
  //         tripRequest.getTripData()
  //           .then((trips) => {
  //             this.setState({ trips });
  //           });
  //       })
  //       .catch(err => console.error('error with listings post', err));
  //   }
  // }

  render() {
    return (
      <div>
      <h2>EditTrip Component</h2>
      </div>
    );
  }
}

export default EditTrip;
