import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";
import axios from "axios";

import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/Register';
import CreateGoals from './components/CreateGoalsForm';
import EditGoals from './components/EditGoalsForm';
import NagTracker from './components/NagTracker';
import GoalsIndex from './components/GoalsIndex';
import Video from './components/Video';
import AuthContext from './helpers/AuthContext';
import UserContext from './helpers/UserContext';
import GoalsContext from './helpers/GoalsContext';

import './App.css';

const checkAuth = () => {
  return axios.get('http://localhost:8001/api/auth', { withCredentials: true })
    .then((response) => {
      console.log("response", response);
      if (response.data.result === true) {
        return { isAuthenticated: true, id: response.data.id }
      } else return { isAuthenticated: false, id: null }
    });
};

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);
  // console.log("PRIVATE ROUTE AUTH:", auth)
  return (<Route
    {...rest}
    render={props =>
      auth ? (
        [children]
      ) : (
        <Redirect to="/login" />
        )
    } />)
};

/*A <Switch> looks through all its children <Route> elements and renders the first one whose path matches the current URL. Use a <Switch> any time
you have multiple routes, but you want only one of them to render at a time*/

function App(props) {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    checkAuth().then(value => {
      setUser(value.id); 
      setAuth(value.isAuthenticated)})
  }, []) 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <GoalsContext.Provider value={{ goals, setGoals }}> 
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
              {/* <PrivateRoute exact path="/goals/edit">
                <EditGoals />
              </PrivateRoute> */}
              <PrivateRoute exact path="/goals">
                <GoalsIndex />
              </PrivateRoute>
              <PrivateRoute path="/goals/new">
                <CreateGoals />
              </PrivateRoute>
              <PrivateRoute path="/nags">
                <NagTracker />
              </PrivateRoute>
            </Switch>
          </Router>
        </GoalsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;