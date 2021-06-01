import React from "react";
import { Redirect, Route } from "react-router";
const ProtectedRouteUser = (rest) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isAuthenticatedRole = localStorage.getItem("role");
  if (isAuthenticated && isAuthenticatedRole==="user") return <Route {...rest} />;
  return <Redirect to="/login" />;
};

export default ProtectedRouteUser;
