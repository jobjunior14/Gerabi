/* eslint-disable react/prop-types */
import Chart from "react-apexcharts";

export default function Graphique ({options, series, type, width}){

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type= {type}
              width= {width}
            />
          </div>
        </div>
      </div>
    )
}