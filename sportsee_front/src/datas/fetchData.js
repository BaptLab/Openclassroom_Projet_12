import { useEffect, useState } from "react";
// Import mock data directly
import mockdata from "./mockapi/mockdata.json";

async function retrieveAllData(dataType, id) {
  let response;
  switch (dataType) {
    case "userData":
      response = await fetch(`http://localhost:3000/user/${id}`);
      break;
    case "performancesData":
      response = await fetch(`http://localhost:3000/user/${id}/performance`);
      break;
    case "sessionsData":
      response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
      break;
    case "acivityData":
      response = await fetch(`http://localhost:3000/user/${id}/activity`);
      break;
    default:
      return 0;
  }
  const data = await response.json();
  return data;
}

//MOCKAPI

async function retrieveMockData(dataType, id) {
  // No need for fetch calls here, directly return the corresponding mock data
  switch (dataType) {
    case "userData":
      const userDataMock = mockdata.USER_MAIN_DATA.filter(
        (e) => e.userId === parseInt(id)
      );
      return userDataMock[0];
    case "performancesData":
      const performancesDataMock = mockdata.USER_PERFORMANCE.filter(
        (e) => e.userId === parseInt(id)
      );

      return performancesDataMock[0];
    case "sessionsData":
      const sessionsDataMock = mockdata.USER_AVERAGE_SESSIONS.filter(
        (e) => e.userId === parseInt(id)
      );
      return sessionsDataMock[0];
    case "acivityData":
      const activityDataMock = mockdata.USER_ACTIVITY.filter(
        (e) => e.userId === parseInt(id)
      );
      return activityDataMock[0];
    default:
      return null;
  }
}

export default function useFetch(id) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (process.env.REACT_APP_API_FETCH === "TRUE") {
        try {
          let userData = await retrieveAllData("userData", id);
          userData = userData.data;
          let activityData = await retrieveAllData("acivityData", id);
          activityData = activityData.data;
          let perfData = await retrieveAllData("performancesData", id);
          perfData = perfData.data;
          let sessionsData = await retrieveAllData("sessionsData", id);
          sessionsData = sessionsData.data;
          setData({ userData, activityData, perfData, sessionsData });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      } else {
        try {
          let userData = await retrieveMockData("userData", id);
          let activityData = await retrieveMockData("acivityData", id);
          let perfData = await retrieveMockData("performancesData", id);
          let sessionsData = await retrieveMockData("sessionsData", id);
          setData({ userData, activityData, perfData, sessionsData });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [id]);
  return { loading, data };
}
