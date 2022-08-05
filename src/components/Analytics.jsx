import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";
// import prediction from "../assets/JsonData/prediction.json";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const customerTableHead = ["index", "URL", "attack prediction", "description"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const orderStatus = {
  0: "Normal",
  1: "SqlInjection",
  2: "XSS",
  3: "DirectoryTraversal",
};

const Dashboard = (props) => {
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
        text: "Logs Chart for Normal and attack Prediction",
        style: {
          fontSize: "16px",
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
      }
    }
    const catgsNumber = {
      Normal: catgs.Normal.length,
      SqlInjection: catgs.SqlInjection.length,
      XSS: catgs.XSS.length,
      DirectoryTraversal: catgs.DirectoryTraversal.length,
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

  const getData = async () => {
    try {
      // http://127.0.0.1:8000/predict
      axios.get(props.api).then((res) => {
        console.log(res);
        // setPrediction(res.data);
        buildAnalyics(res.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2 className="page-header">Analytics</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {[
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.Normal,
                title: "Normal",
              },
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.SqlInjection,
                title: "Sql injection",
              },

              {
                icon: "bx bx-line-chart",
                count: catgsNumber.DirectoryTraversal,
                title: "Directory Traversal",
              },
              {
                icon: "bx bx-line-chart",
                count: catgsNumber.XSS,
                title: "XSS ",
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
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            {cahrtData ? (
              <Chart
                type="donut"
                height={300}
                width={400}
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
      </div>
    </div>
  );
};

export default Dashboard;
