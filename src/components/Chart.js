import React from "react";
import { Pie } from "react-chartjs-2";

//Chart that renders dynamically based on data from the backend
//*************************************************************
const Chart = props => {
  console.log("props data is ", props.data);
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
        data: props.data,
        backgroundColor: ["#26D695", "#FF101F", "#CABAC8"]
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
            text: `Total Nag Completion Rate`,
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
