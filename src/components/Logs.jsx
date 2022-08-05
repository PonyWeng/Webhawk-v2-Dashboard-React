import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
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
  const [currentItem, setCurrentItem] = useState(null);
  const [show, setShow] = useState(false);
  const [isRenderData, setIsRenderData] = useState(false);
  const [newData, setNewData] = useState([]);
  const [prediction, setPrediction] = useState([]);

  const handleClose = () => setShow(false);
  const handleButtonShown = (id) => {
    setShow(true);
    const itemObject = prediction.find((obj) => obj.index === id);
    console.log(id);
    console.log(itemObject);

    setCurrentItem(itemObject);
  };
  const LastToFirst = (data) => {
    const items = [];
    for (var i = data.length; i >= 1; i--) {
      if (data[i] !== undefined) {
        let item = data[i];
        item.index = data.length - i;
        item.status = orderStatus[item.attack_prediction];

        items.push(item);
      }
    }
    return items;
  };
  const tableSearch = (val, dataOld) => {
    setIsRenderData(false);
    const data = LastToFirst(dataOld || prediction);
    let searchData = data;
    if (val !== "") {
      searchData = data.filter((x) => x.status === val);
    }
    setTimeout(() => {
      setIsRenderData(true);
    }, 100);
    setNewData(searchData);
  };

  const renderBody = (item, id) => (
    <tr key={id}>
      <td>{item.index}</td>
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
          onClick={() => handleButtonShown(item.index)}
        >
          Details
        </button>
      </td>
    </tr>
  );
  const getData = async () => {
    try {
      // http://127.0.0.1:8000/predict
      axios.get(props.api).then((res) => {
        console.log(res);
        setPrediction(res.data);
        tableSearch("", res.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="page-header">LOGS</h2>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <div className="form-group mb-4">
                    <label htmlFor="">Search filter</label>
                    <select
                      className="form-control"
                      name=""
                      id="myInput"
                      onChange={(e) => tableSearch(e.target.value)}
                    >
                      <option value="">select filter</option>

                      <option value="XSS">XSS</option>
                      <option value="DirectoryTraversal">
                        Directory Traversal
                      </option>
                      <option value="Normal">Normal</option>
                      <option value="SqlInjection">Sql Injection</option>
                    </select>
                  </div>
                  {isRenderData ? (
                    <Table
                      limit="10"
                      headData={customerTableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={newData}
                      renderBody={(item, index) => renderBody(item, index)}
                    />
                  ) : null}
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
              <div className="desc">
                <h3>Attack Prediction </h3>{" "}
                <Badge
                  type={orderStatus[currentItem.attack_prediction]}
                  content={orderStatus[currentItem.attack_prediction]}
                />
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
