import React from "react";
import { Route, Switch } from "react-router";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import History from "../pages/user/History";
import WishList from "../pages/user/WishList";
import CheckoutPage from "../pages/CheckoutPage";
import Payment from "../pages/Payment";
import Navbar2 from '../components/Navbar2'

const UserLayout = () => {
  return (
    <div>
      {/* <Navbar2/> */}
      <Switch>
        <Route exact path="/user/profile" component={UserDashboardPage} />
        <Route exact path="/user/dashboard" component={UserDashboardPage} />
        <Route exact path="/user/history" component={History} />
        <Route exact path="/user/WishList" component={WishList} />
        <Route exact path="/user/checkout" component={CheckoutPage} />
        <Route exact path="/user/payment" component={Payment} />
      </Switch>
    </div>
  );
};

export default UserLayout;
