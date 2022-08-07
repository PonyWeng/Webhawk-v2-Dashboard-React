import React from "react";

import Logs from "../components/Logs";
import config from "../config";
const Dashboard = () => {
  return <Logs api={config.api} />;
};

export default Dashboard;
