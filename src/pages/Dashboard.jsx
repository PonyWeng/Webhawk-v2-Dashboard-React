import React from "react";

import Analytics from "../components/Analytics";
import Logs from "../components/Logs";
import config from "../config";

const Dashboard = () => {
  return (
    <>
      <Analytics api={config.api} />
      <Logs api={config.api} />
    </>
  );
};

export default Dashboard;
