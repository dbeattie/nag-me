import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/Register';
import CreateGoals from './components/CreateGoalsForm';
import NagTracker from './components/NagTracker';
import GoalsIndex from './components/GoalsIndex';

import './App.css';

/*A <Switch> looks through all its children <Route> elements and renders the first one whose path matches the current URL. Use a <Switch> any time
you have multiple routes, but you want only one of them to render at a time*/

function App() {
  return (
    <Router>
         <div>
            <NavBar />
          </div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/goals">
            <GoalsIndex />
          </Route>
          <Route path="/goals/new">
            <CreateGoals />
          </Route>
          <Route path="/nags">
            <NagTracker />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;