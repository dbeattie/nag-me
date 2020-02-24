import React, { useEffect } from 'react';
import axios from "axios";
import NagOutlinedCard from './NagCard';

// //Styling, don't touch for now, may apply to this page.
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

  const [nags, setNags] = React.useState([]);
  
  //Get data from nags table from database
  const fetchNags = async () => {
  
    try {
      const allNags = await axios.get("http://localhost:8001/api/nags", { withCredentials: true });

      //Convert the object that comes back into an array of objects
      const nagArray = Object.keys(allNags.data).map(nag => {
        return allNags.data[nag];
      });
      
      setNags(nagArray);
    
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNags();
  }, [])

  // console.log("NAG PAGE USER:", user)

  // UPDATE THE BELOW LOGIC TO HANDLE COMPLETED OR NOT

  const nagCards = nags.map((nag) => {

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
   
  return (
    <div>
       <h1> Nags </h1>
      <section className="goalCards" style={{ maxwidth: "100%" }}>
        {nagCards}
      </section>
    </div>
  );
}
