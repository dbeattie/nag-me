import React from "react";
import { Pie } from "react-chartjs-2";

//Chart that renders dynamically based on data from the backend
//*************************************************************
const Chart = props => {

  const chartData = { 
       labels: [
        "Days Nag Completed",
        "Days Nags Incomplete",
        "Nags With No Reply"
      ],
      fontSize: 20,
      datasets: [
        {
          label: "Nag Completion",
          data: props.data ,
          backgroundColor: ["#3F51B5", "#F50057", "#CABAC8"] 
        }
      ]
   };
  

  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          title: {
            display: true,
            text: `Your Nag Completion Rate`,
            fontSize: 25,
            align: "center",
            responsive: true
          },
          legend: {
            display: true,
            position: "bottom"
          }
        }}
      />
    </div>
  );
};

export default Chart;
