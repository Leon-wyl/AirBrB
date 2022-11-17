import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
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
import { UserContext } from './store/UserContext';

const App = () => {
  const [token, setToken] = useState('');
  const [isFetchedGoogle, setIsFetchedGoogle] = useState(false);
  return (
    <>
      <UserContext.Provider value={{ token, setToken, isFetchedGoogle, setIsFetchedGoogle }}>
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
      </UserContext.Provider>
    </>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(UserContext);
  const email = localStorage.getItem('email');
  const localStorageToken = localStorage.getItem('token');
  const isLoggedIn = token && email && localStorageToken;

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
