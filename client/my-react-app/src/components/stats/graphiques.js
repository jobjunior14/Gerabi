import React from "react";
import Chart from "react-apexcharts";

export default function Graphique (props){
//   constructor(props) {
//     super(props);
//     console.log (this);
//     this.state = {
//       options: {
//         chart: {
//           id: "basic-bar"
//         },
//         xaxis: {
//           categories: ['janvier', 1992, 1993, 1994, 1995, 1996, 1997, 1998, 2013]
//         }
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91, 12]
//         },
//         {
//           name: "series-2",
//           data: [30, 40, 45, 50, 49, 60, 70, 91, 12]
//         },
//         {
//           name: "series-2",
//           data: [10, 40, 45, 50, 49, 60, 70, 91, 12]
//         }
//       ]
//     };
//   }

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={props.options}
              series={props.series}
              type= {props.type}
              width= {props.width}
            />
          </div>
        </div>
      </div>
    )
};