// src/components/PrivateRoute.js

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

// const PrivateRoute = ({ component: Component, path, ...rest }) => {
//   const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

//   useEffect(() => {
//     if (loading || isAuthenticated) {
//       return;
//     }
//     const fn = async () => {
//       await loginWithRedirect({
//         appState: { targetUrl: path }
//       });
//     };
//     fn();
//   }, [loading, isAuthenticated, loginWithRedirect, path]);

//   const render = props =>
//     isAuthenticated === true ? <Component {...props} /> : null;

//   return <Route path={path} render={render} {...rest} />;
// };

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { isAuthenticated, loginWithRedirect, loading } = useAuth0();
  
    useEffect(() => {
      const fn = async () => {
        // here
        if (loading === false && !isAuthenticated) {
          await loginWithRedirect({
            appState: { targetUrl: path }
          });
        }
      };
      fn();
    }, [isAuthenticated, loginWithRedirect, path, loading]);
  
    const render = props =>
      isAuthenticated === true ? <Component {...props} /> : <div>loading...</div>;
  
    return <Route path={path} render={render} {...rest} />;
  };

export default PrivateRoute;