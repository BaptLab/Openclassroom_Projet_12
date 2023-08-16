import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import React from "react";
import Routing from "./Routing.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
