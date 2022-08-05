import React from "react";

import Analytics from "../components/Analytics";

const Dashboard = () => {
  const api = "http://127.0.0.1:8000/predict";
  //const api = "http://127.0.0.1:3000/prediction_output.json";

  return <Analytics api={api} />;
};

export default Dashboard;
