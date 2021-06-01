import React from "react";
import { Route, Switch } from "react-router";

// COMPONENTS
// import Header from "../components/Header";
// PAGES
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
// import VerifyEmailPage from "../pages/VerifyEmailPage"
import CartPage from "../pages/CartPage"
import ShopPage from "../pages/ShopPage"
import CategoryHome from "../pages/CategoryHome"
import AccountPage from "../pages/AccountPage"
const PublicLayout = () => {
  return (
    <div id="home">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={AccountPage} />
        <Route exact path="/product/:id" component={ProductDetailPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/products" component={ShopPage} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        {/* <Route exact path="/verify" component={VerifyEmailPage} /> */}
      </Switch>
    </div>
  );
};

export default PublicLayout;
