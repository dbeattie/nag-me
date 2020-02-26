import React, { useEffect, useContext, useState } from 'react';
import axios from "axios";
import FloatingActionButton from './CreateNewFloatingButton';
import GoalOutlinedCard from './GoalCard';
import EditGoals from './EditGoalsForm';
import { Redirect } from "react-router-dom";
import AuthContext from '../helpers/AuthContext';
import GoalsContext from '../helpers/GoalsContext';

export default function GoalsIndex(props) {

  const [card, setCard] = useState([]);
  const [editing, setEditing] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { goals, setGoals } = useContext(GoalsContext);

  // console.log("GOAL PAGE USER:", user)

  const fetchData = async () => {

    try {
      const goals = await axios.get("http://localhost:8001/api/goals", { withCredentials: true })
  
      //Convert the object that comes back into an array of objects
      const goalsArr = Object.keys(goals.data).map(goal => {
        return goals.data[goal]
      });
  
      setCard(goalsArr);
      setGoals(goalsArr);
  
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

  // console.log("WHAT ARE GOALS ARE AVAILABLE:", goals);

  const goalCards = card.map((goal) => {
    return (
      <GoalOutlinedCard
        key={goal.id}
        id={goal.id}
        name={goal.goal_name}
        simpleEndDate={goal.simple_end_date}
        endDate={goal.end_date}
        friend1={goal.friend_1_phone_number}
        friend2={goal.friend_2_phone_number}
        delete={deleteGoal}
        edit={setEditing}
      />
    );
  });

  // simplifiedEndDate={editing.simple_end_date}
  if (!auth) {
    return (<Redirect to="/login" />);
  } else {
    return (
      <div>
        {editing ? (<EditGoals
          id={editing.id}
          name={editing.name}
          simpleEndDate={editing.simpleEndDate}
          endDate={editing.endDate}
          friend1={editing.friend1}
          friend2={editing.friend2}
          dismiss={() => setTimeout(() => { setEditing(false); }, 2000)}
        />
        ) : (<>
             <h1>&nbsp;&nbsp;Goals</h1>
              <section className="goalCards" style={{ maxwidth: "100%" }}>
                {goalCards}
              </section>

              <FloatingActionButton />
            </>)
        }

      </div>
    );
  }
};