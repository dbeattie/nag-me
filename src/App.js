// import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";
import axios from "axios";
// import { PrivateRoute } from "./helpers/PrivateRoute"

import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/Register';
import CreateGoals from './components/CreateGoalsForm';
import NagTracker from './components/NagTracker';
import GoalsIndex from './components/GoalsIndex';
import Video from './components/Video';

import './App.css';

import React, { useEffect, Component } from "react";

const checkAuth = () => {
  axios.get('/auth', { withCredentials: true })
    .then((response) => {
      if (response.data.result === "user") {
        return true
      } else return false
    });
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

/*A <Switch> looks through all its children <Route> elements and renders the first one whose path matches the current URL. Use a <Switch> any time
you have multiple routes, but you want only one of them to render at a time*/

function App(props) {
  
  useEffect(() => {
    checkAuth();
  }, [])  

  return (
    <Router>
      <div>
        <NavBar />
      </div>
      <Switch>
        <Route path="/home">
          <Video />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        <PrivateRoute path="/goals/new">
          <CreateGoals />
        </PrivateRoute>
        <PrivateRoute path="/goals">
            <GoalsIndex />
        </PrivateRoute>
        <PrivateRoute path="/nags">
          <NagTracker />
        </PrivateRoute>
      </Switch>
    </Router>
    
  )
}

export default App;