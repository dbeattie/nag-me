import React, { useEffect, useContext } from 'react';
import axios from "axios";
import FloatingActionButton from './CreateNewFloatingButton';
import GoalOutlinedCard from './GoalCard';
import EditGoals from './EditGoalsForm';


import UserContext from '../helpers/UserContext';

// import styled from "styled-components";

// const StyledHeader = styled.div`
//   align-items: center;
//   h2 {
//     font-family: Arial, Helvetica, sans-serif;
//     font-size: 14px;
//   }
// `;

export default function GoalsIndex() {

  const [card, setCard] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
  const { user } = useContext(UserContext);

  console.log("USER:", user)

  const fetchData = () => {
    axios.get("http://localhost:8001/api/goals")
      .then((goals) => {
        //Convert Object of Objects into an Array of Objects
        const goalArr = Object.keys(goals.data).map(goal => {
          return goals.data[goal]
        });

        //Filter that Array by User_id and deletes data we don't want/need
        const filteredGoals = goalArr.filter(obj => {
          if (obj.user_id === 2 || obj.user_id === 1 || obj.user_id === 3) {
            // delete obj.user_id
            // delete obj.start_date
            delete obj.cron
            return obj
          } else return null
        });
        setCard(filteredGoals);
      }).catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const deleteGoal = (id) => {
    axios.put('http://localhost:8001/api/goals/delete', { id })
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
    console.log("I am the goal: ", goal);
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