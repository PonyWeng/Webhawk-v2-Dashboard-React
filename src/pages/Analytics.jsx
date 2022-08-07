import React from "react";

import Analytics from "../components/Analytics";
import config from "../config";

const Dashboard = () => {
  return <Analytics api={config.api} />;
};

export default Dashboard;
