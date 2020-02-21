import React from 'react';
import axios from "axios";
import FloatingActionButton from './CreateNewFloatingButton';
import NagOutlinedCard from './NagCard';



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

export default function NagTracker() {
  
 
  const [nags, setNags] = React.useState([]);
  
  //Get data from nags table from database
  const fetchNags = () => {
    axios.get("http://localhost:8001/api/nags")
    .then((results) => {
      const nagArray = Object.keys(results.data).map(nag => {
        return results.data[nag];
      });
      // console.log(nagArray);
      const filterNags = nagArray.filter(obj => {
        if (obj.goal_id === 2) {
          return obj
        } else return null;
      });
      console.log('filtered nags are:',filterNags);
      setNags(filterNags);
      // return filterNags;
    })
    .catch(err => console.error(err));
  }

  React.useEffect(() => {
    fetchNags();
  }, [])

  // UPDATE THE BELOW LOGIC TO HANDLE COMPLETED OR NOT

  // const deleteGoal = (id) => {
  //   axios.put('http://localhost:8001/api/nags/delete', { id })
  //     .then(res => {
  //       console.log("I am res.data:", res.data);
  //       fetchData();
  //     })
  // }


  const nagCards = nags.map((nag) => {
    return (
      <NagOutlinedCard
      key={nag.id}
      id={nag.id}
      name={nag.nag_name}
      endDate={nag.date}
      friend1={nag.friend_1_phone_number}
      friend2={nag.friend_2_phone_number}
      // delete={deleteGoal}
      />
      );
    });
   
  return (
    <div>
       <h1> Nags </h1>
      <section className="goalCards" style={{ maxwidth: "100%" }}>
        {nagCards}
      </section>
      <FloatingActionButton />
    </div>
  );
}
