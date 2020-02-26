import React from "react";
// Creates a simple button 
// ***********************
export default function Button(props) {
  return <button onClick={props.onClick}>{props.name}</button>;
}
