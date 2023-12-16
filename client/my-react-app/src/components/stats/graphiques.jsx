import React from "react";
import Chart from "react-apexcharts";

export default function Graphique (props){

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