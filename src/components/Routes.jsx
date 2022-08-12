import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/DashboardPage";
import Logs from "../pages/LogsPage";
import Analytics from "../pages/AnalyticsPage";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/Logs" component={Logs} />
      <Route path="/Analytics" component={Analytics} />
    </Switch>
  );
};

export default Routes;
