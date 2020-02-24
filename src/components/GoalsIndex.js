import React, { useEffect } from 'react';
import axios from "axios";
import FloatingActionButton from './CreateNewFloatingButton';
import GoalOutlinedCard from './GoalCard';
import EditGoals from './EditGoalsForm';

// import styled from "styled-components";

// const StyledHeader = styled.div`
//   align-items: center;
//   h2 {
//     font-family: Arial, Helvetica, sans-serif;
//     font-size: 14px;
//   }
// `;

export default function GoalsIndex(props) {

  const [card, setCard] = React.useState([]);
  const [editing, setEditing] = React.useState(false);

  // console.log("GOAL PAGE USER:", user)

  const fetchData = async () => {
    
    try {
      const goals = await axios.get("http://localhost:8001/api/goals", { withCredentials: true })
      
      //Convert the object that comes back into an array of objects
      const goalsArr = Object.keys(goals.data).map(goal => {
        return goals.data[goal]
      });

      setCard(goalsArr);
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const deleteGoal = (id) => {
    axios.put('http://localhost:8001/api/goals/delete', { id }, { withCredentials: true })
      .then(res => {
        fetchData();
      })
  }

  // const editGoal = (currentGoal) => {
  //   return (
  //     <EditGoals
  //       id={currentGoal.id}
  //       name={currentGoal.name}
  //       endDate={currentGoal.endDate}
  //       friend1={currentGoal.friend1}
  //       friend2={currentGoal.friend2}
  //     />
  //   )
  // };

  const goalCards = card.map((goal) => {
    return (
      <GoalOutlinedCard
        key={goal.id}
        id={goal.id}
        name={goal.goal_name}
        endDate={goal.end_date}
        friend1={goal.friend_1_phone_number}
        friend2={goal.friend_2_phone_number}
        delete={deleteGoal}
        edit={setEditing}
      />
    );
  });

  if (!auth) {
    return (<Redirect to="/login" />); 
  } else {
    return (
      <div>
        { editing && (<EditGoals
          id={editing.id}
          name={editing.name}
          endDate={editing.endDate}
          friend1={editing.friend1}
          friend2={editing.friend2}
        />
      )}
      {/* <StyledHeader> */}
        <h1>Goals</h1>   
      {/* </StyledHeader> */}
        <section className="goalCards" style={{ maxwidth: "100%" }}>
          {goalCards}
        </section>
        
        <FloatingActionButton />
      </div>
    );
  }
};