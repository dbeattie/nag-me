import React, { useEffect } from 'react';
import axios from "axios";

import FloatingActionButton from './CreateNewFloatingButton';
import GoalOutlinedCard from './GoalCard';

export default function GoalsIndex() {

  const [card, setCard] = React.useState([]);

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
            delete obj.user_id
            delete obj.start_date
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
        console.log("I am res.data:", res.data);
        fetchData();
      })
  }

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
      />
    );
  });

  return (
    <div>
      <section className="goalCards" style={{ maxwidth: "100%" }}>
        {goalCards}
      </section>
      <FloatingActionButton />
    </div>
  );
}