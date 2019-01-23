import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    // const view = e.target.closest('.card').id;
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='Home'>
        <div className="card-deck mt-5">
          <div className="card border-dark" id="trips" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-comments fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">My Trips</h6>
              <p className="card-text">Look at your Trips</p>
            </div>
          </div>
          <div className="card border-dark" id='trips/add' onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-user-friends fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Add Trips</h6>
              <p className="card-text">Create a Trip</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
