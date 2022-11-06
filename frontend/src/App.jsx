import React, { useState, useContext } from 'react';
import Navbar from './pages/navbar/Navbar';
import Login from './pages/User/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './pages/User/Register';
import { UserContext } from './store/UserContext';
import MyListings from './pages/my-listings/MyListings';
import NewListing from './pages/NewListing/NewListing';
import Home from './pages/Home/Home';

function App () {
  const token = localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState(token);
  return (
    <>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <PrivateRoute path="/mylistings" component={MyListings} />
          <PrivateRoute path="/newlisting" component={NewListing} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useContext(UserContext);
  const isLoggedIn = userInfo.token;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
  )}
    />
  );
};

export default App;
