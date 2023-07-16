//a remplacer par l'API
import userData from "./datas/userdata.json";

import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NutritionCard from "./components/NutritionCard";

//svg import as components
import { ReactComponent as CalorieIcon } from "./assets/nutritions-icons/calories-icon.svg";
import { ReactComponent as CarbsIcon } from "./assets/nutritions-icons/carbs-icon.svg";
import { ReactComponent as FatIcon } from "./assets/nutritions-icons/fat-icon.svg";
import { ReactComponent as ProteinIcon } from "./assets/nutritions-icons/protein-icon.svg";
import GraphBox from "./components/GraphBox";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <div className="nav-and-dashboard">
      <Sidebar />
      <main className="dashboard-container">
        <h2 className="greetings">
          Bonjour <span className="greetings-name">{userData.userInfos.firstName}</span>
        </h2>
        <h3 className="congrats">
          Félicitation ! Vous avez explosé vos objectif hier 👏
        </h3>
        <div className="data-visuals-container">
          <div className="graphs-container">
            <div className="charts-container">
              <BarChart />
            </div>
            <div className="small-graphs-container">
              <GraphBox id="line-chart">
                <LineChart />
              </GraphBox>
              <GraphBox id="line-chart">
                <LineChart />
              </GraphBox>
              <GraphBox id="line-chart">
                <LineChart />
              </GraphBox>
            </div>
            <div className="small-graphs-container"></div>
          </div>
          <div className="nutrition-cards-container">
            <NutritionCard value={userData.keyData.calorieCount} unit="Calories">
              <CalorieIcon />
            </NutritionCard>
            <NutritionCard value={userData.keyData.proteinCount} unit="Protéines">
              <CarbsIcon />
            </NutritionCard>
            <NutritionCard value={userData.keyData.carbohydrateCount} unit="Glucides">
              <FatIcon />
            </NutritionCard>
            <NutritionCard value={userData.keyData.lipidCount} unit="Lipides">
              <ProteinIcon />
            </NutritionCard>
          </div>
        </div>
      </main>
    </div>
  </React.StrictMode>
);
