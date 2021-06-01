import React from "react";
import { Route, Switch } from "react-router";
// PAGES
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import CategoryCreate from "../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../pages/admin/category/CategoryUpdate";
import ProductCreate from "../pages/admin/product/ProductCreate";
import ProductUpdate from "../pages/admin/product/ProductUpdate";
import AllProducts from "../pages/admin/product/AllProducts";
import CreateCoupon from "../pages/admin/coupon/CreateCoupon";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin/profile" component={AdminDashboardPage} />
        <Route exact path="/admin/dashboard" component={AdminDashboardPage} />
        <Route exact path="/admin/category" component={CategoryCreate} />
        <Route exact path="/admin/category/:slug" component={CategoryUpdate} />
        <Route exact path="/admin/product" component={ProductCreate} />
        <Route exact path="/admin/products" component={AllProducts} />
        <Route exact path="/admin/product/:id" component={ProductUpdate} />
        <Route exact path="/admin/coupon" component={CreateCoupon} />
      </Switch>
      {/* <Footer/> */}
    </div>
  );
};

export default AdminLayout;
