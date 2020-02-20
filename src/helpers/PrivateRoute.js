// import React, { Component } from "react";
// import { Route } from "react-router";
// import { Redirect } from "react-router-dom";
// // import { checkAuth } from "./helpers/CheckAuth"

// const checkAuth = () => {
//   //   const cookies = cookie.parse(document.cookie);
//   //   if (cookies.id_token) {
//   //     return true;
//   //   }
//   //   return false;
//   // };

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       checkAuth() === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

