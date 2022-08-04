import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";
import prediction from "../assets/JsonData/prediction.json";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const chartOptions = {
  options: {
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
    labels: ["XSS", "Normal", "DirectoryTraversal", "SqlInjection"],
  },
};
const customerTableHead = ["index", "URL", "attack prediction", "description"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const orderStatus = {
  0: "Normal",
  1: "SqlInjection",
  2: "XSS",
  3: "DirectoryTraversal",
};

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const [currentItem, setCurrentItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleButtonShown = (id) => {
    setShow(true);
    const itemObject = prediction.find((obj) => obj.id === id);
    setCurrentItem(itemObject);
  };
  const LastToFirst = () => {
    const items = [];
    for (var i = prediction.length; i >= 1; i--) {
      if (prediction[i] !== undefined) {
        items.push(prediction[i]);
      }
    }
    return items;
  };

  const renderBody = (item, id) => (
    <tr key={id}>
      <td>{id + 1}</td>
      <td>{item.URL}</td>
      <td>
        <Badge
          type={orderStatus[item.attack_prediction]}
          content={orderStatus[item.attack_prediction]}
        />
      </td>

      <td>
        <button
          class="btn table-info-btn"
          onClick={() => handleButtonShown(item.id)}
        >
          Details
        </button>
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
              series={[47, 7, 27, 22]}
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
                    bodyData={LastToFirst()}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>The Description of Attack Prediction</h3>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body show={show}>
          {currentItem ? (
            <div className="modal-details">
              <h2>
                <b>URL</b>: {currentItem.URL}
              </h2>
              <div className="desc">
                <h3>Description</h3>
                <p>{currentItem.description}</p>
              </div>
              <div className="return-code">
                <h3>Return Code</h3>
                <p>{currentItem.return_code}</p>
              </div>
              <div className="desc log">
                <h3>Log Record</h3>
                <p>{currentItem.log_record}</p>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary btn-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
