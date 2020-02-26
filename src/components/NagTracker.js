import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AuthContext from "../helpers/AuthContext";
import UserContext from "../helpers/UserContext";
import NagOutlinedCard from "./NagCard";
import Chart from "./Chart";

// function that handles the Nags and their functionality
// ******************************************************
export default function NagTracker(props) {
  const { user } = useContext(UserContext);
  const [nags, setNags] = React.useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const [chart, setChart] = React.useState([]);

  //Get data from nags table from database
  const fetchNags = async () => {
    try {
      const nags = await axios.get(
        "http://localhost:8001/api/nags/completiondata",
        { withCredentials: true }
      );

      //Convert the object that comes back into an array of objects
      const nagsArr = Object.keys(nags.data).map(nag => {
        return nags.data[nag];
      });

      const allNags = await axios.get("http://localhost:8001/api/nags", {
        withCredentials: true
      });
      console.log("nag arr is ", nagsArr);
      //Convert the object that comes back into an array of objects
      const nagArray = Object.keys(allNags.data).map(nag => {
        return allNags.data[nag];
      });
      setChart(nagsArr);
      setNags(nagArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNags();
  }, []);

  const nagYes = id => {
    axios
      .post(
        "http://localhost:8001/api/nags/toggletrue",
        { id },
        { withCredentials: true }
      )
      .then(res => {
        fetchNags();
      });
  };

  const nagNo = id => {
    axios
      .post(
        "http://localhost:8001/api/nags/togglefalse",
        { id },
        { withCredentials: true }
      )
      .then(res => {
        fetchNags();
      });
  };

  const nagCards = nags.map(nag => {
    return (
      <NagOutlinedCard
        key={nag.id}
        id={nag.id}
        name={nag.nag_name}
        simpleEndDate={nag.simple_date}
        endDate={nag.date}
        completion={nag.completion}
        nagYes={nagYes}
        nagNo={nagNo}
      />
    );
  });

  if (!auth) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <h1> Nags </h1>
        <Chart data={chart} />
        <section className="goalCards" style={{ maxwidth: "100%" }}>
          {nagCards}
        </section>
      </div>
    );
  }
}
