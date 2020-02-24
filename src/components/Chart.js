import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const Chart = props => {
  const [state, setState] = useState({
    chartData: {
      labels: ["Days Nag Completed", "Days Nags Incomplete"],
      datasets: [
        {
          label: "Nag Completion",
          data: [80, 20],
          backgroundColor: ["#FB3640", "#253D5B", "#EFCA08", "#43AA8B"]
        }
      ]
    }
  });

  useEffect(()=> {
      console.log("it works")
  })

  return (
    <div className="chart">
      <Pie
        data={state.chartData}
        options={{
          title: {
            display: true,
            text: `Nag Completion Rate during Learn the Guitar`,
            fontSize: 20,
            align: "center",
            responsive: true
          },
        //   plugins: {
        //     datalabels: {
        //       color: "#fff",
        //       anchor: "end",
        //       align: "start",
        //       offset: -10,
        //       borderWidth: 2,
        //       borderColor: "#fff",
        //       borderRadius: 25,
        //       backgroundColor: context => {
        //         return context.dataset.backgroundColor;
        //       },
        //       font: {
        //         weight: "bold",
        //         size: 15
        //       },
        //       formatter: value => {
        //         return value + " %";
        //       }
        //     }
        //   },
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
