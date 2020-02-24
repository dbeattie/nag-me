import React, { useContext, useEffect } from "react";
import axios from "axios";

import UserContext from "../helpers/UserContext";
import NagOutlinedCard from "./NagCard";
import Chart from "./Chart";

// //Styling, don't touch
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

export default function NagTracker(props) {
  const { user } = useContext(UserContext);
  const [nags, setNags] = React.useState([]);

  //Get data from nags table from database
  const fetchNags = async () => {
    const allNags = await axios.get("http://localhost:8001/api/nags");

    const nagArray = Object.keys(allNags.data).map(nag => {
      return allNags.data[nag];
    });

    const allGoals = await axios.get("http://localhost:8001/api/goals");

    const goalArray = Object.keys(allGoals.data).map(goal => {
      return allGoals.data[goal];
    });

    //Outputs an array of goals based on the logged in user
    const goalsPerUser = goalArray.filter(obj => {
      if (obj.user_id === user) {
        return obj;
      } else return null;
    });

    //Outputs an array of goal ids
    const GoalIds = goalsPerUser.map(goal => goal.id);

    //Filters the nagArray for any goal_id's that match
    var filteredNags = nagArray.filter(nag => {
      return GoalIds.includes(nag.goal_id);
    });

    setNags(filteredNags);
  };

  React.useEffect(() => {
    fetchNags();
  }, []);

  console.log("NAG PAGE USER:", user);

  // UPDATE THE BELOW LOGIC TO HANDLE COMPLETED OR NOT

  const nagCards = nags.map(nag => {
    return (
      <NagOutlinedCard
        key={nag.id}
        id={nag.id}
        name={nag.nag_name}
        endDate={nag.date}
        completion={nag.completion}
      />
    );
  });
  console.log("nagsCards are, ", nagCards);

  return (
    <div>
      <h1> Nags </h1>
      <Chart />
      <section className="goalCards" style={{ maxwidth: "100%" }}>
        {nagCards}
      </section>
    </div>
  );
}
