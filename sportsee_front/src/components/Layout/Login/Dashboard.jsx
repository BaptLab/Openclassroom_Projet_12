import useFetch from "../../../datas/fetchData";

import React from "react";
import "../../../styles/index.css";
import Header from "../../../components/Layout/Header/Header";
import Sidebar from "../../../components/Layout/SideBar/Sidebar";
import NutritionCard from "../../../components/NutritionCard/NutritionCard";

//svg import as components
import { ReactComponent as CalorieIcon } from "../../../assets/nutritions-icons/calories-icon.svg";
import { ReactComponent as CarbsIcon } from "../../../assets/nutritions-icons/carbs-icon.svg";
import { ReactComponent as FatIcon } from "../../../assets/nutritions-icons/fat-icon.svg";
import { ReactComponent as ProteinIcon } from "../../../assets/nutritions-icons/protein-icon.svg";
import GraphBox from "../../../components/GraphBox/GraphBox.jsx";
import LineChart from "../../../components/Charts/LineChart/LineChart.jsx";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import ArcChart from "../../../components/Charts/ArcChart/ArcChart";
import RadarChart from "../../../components/Charts/RadarChart/RadarChart";

function Dashboard() {
  let params = new URL(document.location).searchParams;
  console.log(params);
  let id = params.get("id");
  console.log(id);

  const { loading, data } = useFetch(id);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

  if (!data || !data.userData) {
    return <div>No data available for the given user.</div>;
  }

  // Destructure the individual data from the 'data' object
  const { userData, activityData, perfData, sessionsData } = data;

  return (
    <React.StrictMode>
      <Header />
      <div className="nav-and-dashboard">
        <Sidebar />
        <main className="dashboard-container">
          <div className="dashboard-text-container">
            <h2 className="greetings">
              Bonjour{" "}
              <span className="greetings-name">{userData.userInfos.firstName}</span>
            </h2>
            <h3 className="congrats">
              Félicitation ! Vous avez explosé vos objectif hier 👏
            </h3>
          </div>
          <div className="dashboard-graph-container">
            <div className="data-visuals-container">
              <div className="graphs-container">
                <div className="charts-container">
                  <BarChart data={activityData} />
                </div>
                <div className="small-graphs-container">
                  <GraphBox id="line-chart">
                    <LineChart data={sessionsData} />
                  </GraphBox>
                  <GraphBox id="radar-chart">
                    <RadarChart data={perfData} />
                  </GraphBox>
                  <GraphBox id="arc-chart">
                    <ArcChart data={userData} />
                  </GraphBox>
                </div>
                <div className="small-graphs-container"></div>
              </div>
              <div className="nutrition-cards-container">
                <NutritionCard value={userData.keyData.calorieCount} unit="Calories">
                  <CalorieIcon />
                </NutritionCard>
                <NutritionCard value={userData.keyData.proteinCount} unit="Protéines">
                  <ProteinIcon />
                </NutritionCard>
                <NutritionCard value={userData.keyData.carbohydrateCount} unit="Glucides">
                  <CarbsIcon />
                </NutritionCard>
                <NutritionCard value={userData.keyData.lipidCount} unit="Lipides">
                  <FatIcon />
                </NutritionCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.StrictMode>
  );
}

export default Dashboard;
