import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";
import prediction from "../assets/JsonData/prediction.json";



const chartOptions = {
  options: {
    chart: {
      background: "transparent",
    },
    legend: {
      position: "bottom"
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%"
        },
      },
    },
    title: {
      text: "Logs Chart for Normal and attack Prediction",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Roboto"
      },
    },
    labels: ["XSS","Normal","DirectoryTraversal","SqlInjection"],
   
  },
};
const customerTableHead = ["index","URL", "attack prediction", "description"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const orderStatus = {
  0: "Normal",
  1: "SqlInjection",
  2: "XSS",
  3: "DirectoryTraversal",
};



const Dashboard = () => {

 

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const [detailsShown, setDetailsShown] = useState([]);

  const handleButtonShown = (id) => {
    const shownState = detailsShown.slice();
    const indexPrediction = shownState.indexOf(id);
    if (indexPrediction >= 0) {
      shownState.splice(indexPrediction, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(id);
      setDetailsShown(shownState);
    }
  };

  const renderBody = (item, id) => (
    <tr key={id}>
      <td>{item.id}</td>
      <td>{item.URL}</td>
      <td>
        <Badge
          type={orderStatus[item.attack_prediction]}
         content={orderStatus[item.attack_prediction]}
        />
      </td>

      <td>
        <button class="button button" variant="primary" onClick={() => handleButtonShown(item.id)}>
          Details
        </button>
        {detailsShown.includes(item.id) && <p className="p"> Description : {item.description}
         Return Code : {item.return_code}</p>}
      </td>
    </tr>
  );

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
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
            <Chart
              type="donut"
              height={300}
              width={400}
              series={[47,7,27,22]}
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
          </div>
        </div>

        <div>
          <h2 className="page-header">LOGS</h2>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={prediction}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
