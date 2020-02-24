import React, { useState, useEffect, useContext } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Chart = props => {
  // const [NagCompletionData, setNagCompletionData] = React.useState([]);

  const fetchData = async () => {
    try {
      const nags = await axios.get(
        "http://localhost:8001/api/nags/completiondata",
        { withCredentials: true }
      );

      //Convert the object that comes back into an array of objects
      const nagsArr = Object.keys(nags.data).map(nag => {
        return nags.data[nag];
      });
      // console.log("nags are ", nagsArr)

      setState({
        chartData: {
          labels: [
            "Days Nag Completed",
            "Days Nags Incomplete",
            "Nags With No Reply"
          ],
          fontSize: 200,
          datasets: [
            {
              label: "Nag Completion",
              data: nagsArr,
              backgroundColor: ["#FB3640", "#253D5B", "#EFCA08", "#43AA8B"]
            }
          ]
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    chartData: {
      labels: [
        "Days Nag Completed",
        "Days Nags Incomplete",
        "Nags With No Reply"
      ],
      fontSize: 200,
      datasets: [
        {
          label: "Nag Completion",
          data: [],
          backgroundColor: ["#FB3640", "#253D5B", "#EFCA08", "#43AA8B"]
        }
      ]
    }
  });
  return (
    <div className="chart">
      <Pie
        data={state.chartData}
        options={{
          title: {
            display: true,
            text: `Nag Completion Rate`,
            fontSize: 25,
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
