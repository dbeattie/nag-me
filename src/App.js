import React from 'react';

import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/Register';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BasicTextFields from './components/GoalsIndex'

function App() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
    </div>
  )
}

export default App;

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
