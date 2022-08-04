import React, { useState } from "react";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import prediction from "../assets/JsonData/prediction.json";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const customerTableHead = ["id", "URL", "attack_prediction", "description"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const orderStatus = {
  0: "Normal",
  1: "SqlInjection",
  2: "XSS",
  3: "DirectoryTraversal",
};

const Settings = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.URL}</td>
      <td>
        <Badge
          type={orderStatus[item.attack_prediction]}
          content={orderStatus[item.attack_prediction]}
        />{" "}
      </td>
      <td>
        <Button class="button button" variant="primary" onClick={handleShow}>
          Description
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>The Description of Attack Prediction</h3>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body show={show}>
            <button
              class="button button"
              variant="primary"
              onClick={() => handleButtonShown(item.id)}
            >
              Details
            </button>
            {detailsShown.includes(item.id) && (
              <p className="p">
                {" "}
                Description : {item.description}
                Return Code : {item.return_code}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-primary btn-primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  );

  return (
    <div>
      <h2 className="page-header">LOGS</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="15"
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
  );
};

export default Settings;
