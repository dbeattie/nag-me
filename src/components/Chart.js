import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Nag Completion Rate during Learn the Guitar",
              fontSize: 25,
              align: "center",
              responsive: true
            },
            // plugins: {
            //   datalabels: {
            //     color: "#fff",
            //     anchor: "end",
            //     align: "start",
            //     offset: -10,
            //     borderWidth: 2,
            //     borderColor: "#fff",
            //     borderRadius: 25,
            //     backgroundColor: context => {
            //       return context.dataset.backgroundColor;
            //     },
            //     font: {
            //       weight: "bold",
            //       size: 15
            //     },
            //     formatter: value => {
            //       return value + " %";
            //     }
            //   }
            // },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
