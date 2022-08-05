import React from "react";

import Logs from "../components/Logs";

const Dashboard = () => {
  const api = "http://127.0.0.1:8000/predict";
  // const api = "http://127.0.0.1:3000/prediction_output.json";

  return <Logs api={api} />;
};

export default Dashboard;
