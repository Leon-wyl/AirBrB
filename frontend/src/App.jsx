import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditListing from './pages/EditListing/EditListing';
import Home from './pages/Home/Home';
import Listing from './pages/Listing/Listing';
import ManageBookings from './pages/ManageBookings/ManageBookings';
import MyListings from './pages/my-listings/MyListings';
import Navbar from './pages/navbar/Navbar';
import NewListing from './pages/NewListing/NewListing';
import Login from './pages/User/Login';
import Register from './pages/User/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listing/:id/:daterange" exact component={Listing} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/mylistings" component={MyListings} />
        <PrivateRoute path="/newlisting" component={NewListing} />
        <PrivateRoute path="/editlisting/:id" component={EditListing} />
        <PrivateRoute path="/bookings/:id" component={ManageBookings} />
      </Switch>
    </>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const isLoggedIn = token && email;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn
          ? <Component {...props} />
          : <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};

export default App;
