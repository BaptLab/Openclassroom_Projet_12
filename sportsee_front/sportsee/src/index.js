import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const { USER_MAIN_DATA } = require("./datas/datamocked.js");
//tout d'abord --> filtrer les données avec l'id x ou y
//puis --> stocker toutes les données utiles qq part pour les appeler

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <div className="nav-and-dashboard">
      <Sidebar />
      <main className="dashboard-container">
        <h2 className="greeting">Bonjour {}</h2>
      </main>
    </div>
  </React.StrictMode>
);
