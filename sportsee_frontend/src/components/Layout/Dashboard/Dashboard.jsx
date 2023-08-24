//Dependencies
import React from "react";

//Data
import useFetch from "../../../datas/fetchData";

//Style
import "../../../styles/index.css";

//Components
import Header from "../Header/Header";
import Sidebar from "../SideBar/Sidebar";
import NutritionCard from "../../NutritionCard/NutritionCard";
import GraphBox from "../../GraphBox/GraphBox.jsx";
import LineChart from "../../Charts/LineChart/LineChart.jsx";
import BarChart from "../../Charts/BarChart/BarChart";
import ArcChart from "../../Charts/ArcChart/ArcChart";
import RadarChart from "../../Charts/RadarChart/RadarChart";

//svg import as components
import { ReactComponent as CalorieIcon } from "../../../assets/nutritions-icons/calories-icon.svg";
import { ReactComponent as CarbsIcon } from "../../../assets/nutritions-icons/carbs-icon.svg";
import { ReactComponent as FatIcon } from "../../../assets/nutritions-icons/fat-icon.svg";
import { ReactComponent as ProteinIcon } from "../../../assets/nutritions-icons/protein-icon.svg";

//Main component

function Dashboard() {
  //retrieving the id passed in the URL to display the corresponding data

  let params = new URL(document.location).searchParams;
  let id = params.get("id");

  //Data being retrieved by the useFetch function (check this function for all the data related manipulation)
  //Which data to use (mock or API) is being decided in this function
  const { loading, user, errMsg } = useFetch(id);

  //Loading message
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }
  //Error message if no data
  if (!user) {
    return (
      <>
        <span>No data available for the given user.</span>
        <br />
        <br />
        <span>Cause : {errMsg}</span>
      </>
    );
  }

  return (
    <React.StrictMode>
      <Header />
      <div className="nav-and-dashboard">
        <Sidebar />
        <main className="dashboard-container">
          <div className="dashboard-text-container">
            <h2 className="greetings">
              Bonjour <span className="greetings-name">{user.firstName}</span>
            </h2>
            <h3 className="congrats">
              Félicitation ! Vous avez explosé vos objectif hier 👏
            </h3>
          </div>
          <div className="dashboard-graph-container">
            <div className="data-visuals-container">
              <div className="graphs-container">
                <div className="charts-container">
                  <BarChart data={user.activitySessions} />
                </div>
                <div className="small-graphs-container">
                  <GraphBox id="line-chart">
                    <LineChart data={user.averageSessions} />
                  </GraphBox>
                  <GraphBox id="radar-chart">
                    <RadarChart data={user.performanceData} />
                  </GraphBox>
                  <GraphBox id="arc-chart">
                    <ArcChart data={user.todayScore} />
                  </GraphBox>
                </div>
                <div className="small-graphs-container"></div>
              </div>
              <div className="nutrition-cards-container">
                <NutritionCard value={user.calorieCount} unit="Calories">
                  <CalorieIcon />
                </NutritionCard>
                <NutritionCard value={user.proteinCount} unit="Protéines">
                  <ProteinIcon />
                </NutritionCard>
                <NutritionCard value={user.carbohydrateCount} unit="Glucides">
                  <CarbsIcon />
                </NutritionCard>
                <NutritionCard value={user.lipidCount} unit="Lipides">
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
