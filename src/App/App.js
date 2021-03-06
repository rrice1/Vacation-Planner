import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import connection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Trip from '../components/pages/Trip/TripPage';
import AddTrip from '../components/pages/AddTrip/AddTrip';
import EditTrip from '../components/pages/EditTrip/EditTrip';

import MyNavbar from '../components/navbar/navbar';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      pendingUser,
    } = this.state;

    if (pendingUser) {
      return null;
    }

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    return (
      <div className="App">
      <BrowserRouter>
      <React.Fragment>
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className='container'>
        <div className="d-flex justify-content-center">
        <div className='row'>
        <Switch>
        <PrivateRoute path='/' exact component={Home} authed={this.state.authed}/>
          <PrivateRoute path='/home' component={Home} authed={this.state.authed}/>
          <PrivateRoute path='/trips/:id/edit' component={EditTrip} authed={this.state.authed}/>
          <PrivateRoute path='/trips/add' component={AddTrip} authed={this.state.authed}/>
          <PrivateRoute path='/trips' component={Trip} authed={this.state.authed}/>
          <PublicRoute path='/auth' component={Auth} authed={this.state.authed}/>
        </Switch>
        </div>
        </div>
        </div>
        </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
