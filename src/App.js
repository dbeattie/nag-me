// from the Auth0

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import CreateGoals from './components/CreateGoalsForm';
import NagTracker from './components/NagTracker';

// src/App.js


// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/goals"component={CreateGoals} />
          <PrivateRoute path="/nags"component={NagTracker} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;



// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

// import NavBar from './components/NavBar';
// import Login from './components/Login';
// import SignUp from './components/Register';
// import CreateGoals from './components/CreateGoalsForm';


// import './App.css';



// function App() {
//   return (
//     <Router>
//          <div>
//             <NavBar />
//           </div>
//         <Switch>
//           <Route path="/login">
//             <Login />
//           </Route>
//           <Route path="/register">
//             <SignUp />
//           </Route>
//           <Route path="/goals/new">
//             <CreateGoals />
//           </Route>
//           <Route path="/nags">
//             <NagTracker />
//           </Route>
//         </Switch>
//     </Router>
//   )
// }

// export default App;

// OLD REACT ROUTER ROUTES
// function App() {
//   return (
//     <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/register">Register</Link>
//         </li>
//         <li>
//           <Link to="/goals">Goals</Link>
//         </li>
//         <li>
//           <Link to="/nags">Nags</Link>
//         </li>
//       </ul>

//       <hr />

//       {/*
//         A <Switch> looks through all its children <Route>
//         elements and renders the first one whose path
//         matches the current URL. Use a <Switch> any time
//         you have multiple routes, but you want only one
//         of them to render at a time
//       */}
//       <Switch>
//         <Route exact path="/">
//           <Home />
//         </Route>
//         <Route path="/login">
//           <Login />
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//         <Route path="/goals">
//           <Goals />
//         </Route>
//         <Route path="/nags">
//           <Nags />
//         </Route>
//       </Switch>
//     </div>
//   </Router>
//   );
// }
