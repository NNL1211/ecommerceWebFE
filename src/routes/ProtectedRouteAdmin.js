import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRouteAdmin = (rest) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isAuthenticatedRole = localStorage.getItem("role");
  if (isAuthenticated && isAuthenticatedRole ==="admin") return <Route {...rest} />;
  return <Redirect to="/" />;
};

export default ProtectedRouteAdmin;
