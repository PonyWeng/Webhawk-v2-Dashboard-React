import Chart from "react-apexcharts";
import ReactDOM from "react-dom";

import React, { useState } from "react";


const Analytics = () => {


  const [chartData] = useState({
    labels: ["SqlInjection", "XSS", "DirectoryTraversal","Normal"],
    datasets: [
      {
        data: [47, 26, 23, 10],
        backgroundColor: ["#ff4a6b", "#36A2EB", "#FFCE56", "#4caf50"],
        hoverBackgroundColor: ["#ff4a6b", "#36A2EB", "#FFCE56", "#4caf50"]
      }
    ]
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057"
        }
      }
    }
  });

  return (
    <div className="col-6">
      <Chart
        type="doughnut"
        data={chartData}
        options={lightOptions}
        style={{ position: "relative", width: "40%" }}
      />
    </div>
  );
}

export default Analytics
