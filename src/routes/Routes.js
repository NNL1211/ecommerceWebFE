import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENTS
import AlertMsg from "../components/AlertMsg";
// import SideDrawer from "../components/SideDrawer";

import Footer from "../components/Footer";

// ROUTES
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout"
import PublicLayout from "./PublicLayout";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteUser from "./ProtectedRouteUser";


const Routes = () => {
  return (
    <div>
      <AlertMsg />
      {/* <SideDrawer /> */}
      <Switch>
        <ProtectedRouteUser path="/user" component={UserLayout} />
        <ProtectedRouteAdmin path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
