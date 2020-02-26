import React, { useState, useEffect, useContext } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Chart = props => {
    console.log("props data is ",props.data)
  // const [NagCompletionData, setNagCompletionData] = React.useState([]);

//   const fetchData = async () => {
    
//       // console.log("nags are ", nagsArr)

    //   setState({
    //     chartData: {
    //       labels: [
    //         "Days Nag Completed",
    //         "Days Nags Incomplete",
    //         "Nags With No Reply"
    //       ],
    //       fontSize: 200,
    //       datasets: [
    //         {
    //           label: "Nag Completion",
    //           data: nagsArr,
    //           backgroundColor: ["#FB3640", "#253D5B", "#EFCA08", "#43AA8B"]
    //         }
    //       ]
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  
//   useEffect(() => {
//     fetchData();
//   }, []);

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
    }
  
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
