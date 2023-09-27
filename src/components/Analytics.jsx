import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";

const Analytics = (props) => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const [cahrtData, setCahrtData] = useState(null);
  const [catgsNumber, setCatgsNumber] = useState({});

  const chartOptions = {
    options: {
      //  colors: ["red", "green", "blue", "blue"],

      chart: {
        background: "transparent",
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
      title: {
        text: "Chart for various Log Classifications",
        align:"center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "Roboto",
          
        },
      },
      labels: cahrtData ? cahrtData.labels : [],
    },
  };

  const buildAnalyics = (data) => {
    const catgs = {
      Normal: [],
      SqlInjection: [],
      XSS: [],
      DirectoryTraversal: [],
      DDoS:[],
    };
    const values = [];
    const labels = [];
    for (let index = 0; index < data.length; index++) {
      const attackPrediction = data[index].attack_prediction;
      if (attackPrediction === 0) {
        catgs.Normal.push(data[index]);
      } else if (attackPrediction === 1) {
        catgs.SqlInjection.push(data[index]);
      } else if (attackPrediction === 2) {
        catgs.XSS.push(data[index]);
      } else if (attackPrediction === 3) {
        catgs.DirectoryTraversal.push(data[index]);
      } else if (attackPrediction === 4){
        catgs.DDoS.push(data[index])
      }
    }
    const catgsNumber = {
      Normal: catgs.Normal.length,
      SqlInjection: catgs.SqlInjection.length,
      XSS: catgs.XSS.length,
      DirectoryTraversal: catgs.DirectoryTraversal.length,
      DDoS: catgs.DDoS.length,
    };
    setCatgsNumber(catgsNumber);
    const catgsNum = Object.entries(catgsNumber);
    for (let index = 0; index < catgsNum.length; index++) {
      const value = catgsNum[index][1];
      const label = catgsNum[index][0];
      values.push(value);
      labels.push(label);
    }
    setCahrtData({ values, labels });
  };

  useEffect(() => {
    buildAnalyics(props.data);
  });
  return (
    <div>
      <h2 className="page-header">Overview</h2>
      <div className="row">

      <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            {cahrtData ? (
              <Chart
                type="donut"
                height={500}
                width={600}
                series={cahrtData.values}
                options={
                  themeReducer === "theme-mode-dark"
                    ? {
                        ...chartOptions.options,
                        theme: { mode: "dark" },
                      }
                    : {
                        ...chartOptions.options,
                        theme: { mode: "light" },
                      }
                }
              />
            ) : null}
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            {[
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.Normal,
                title: "Benign (Normal)",
              },
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.SqlInjection,
                title: "SQL Injection",
              },

              {
                icon: "bx bx-line-chart",
                count: catgsNumber.DirectoryTraversal,
                title: "Directory Traversal",
              },
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.XSS,
                title: "Cross-Site-Scripting(XSS) ",
              },
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.DDoS,
                title: "DDoS ",
              },
            ].map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Analytics;
