import React from "react";
import Style from "./ProtectedRoute.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
