import { useEffect, useState } from "react";
// Import mock data
import mockdata from "./mockapi/mockdata";

//API data retrieving function
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

//MOCKDATA retrieving function
async function retrieveMockData(dataType, id) {
  //According to the data we need, the mockdata is being filtered
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
  //both loading and data state are being updated during the retrieving which allow do dynamically update the DOM
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  //useEffect hook to update dynamically the DOM if the ID changes
  useEffect(() => {
    async function fetchData() {
      //Depending on the .env file value, data is being retrieved from the API or a local file (mockdata)
      if (process.env.REACT_APP_API_FETCH === "TRUE") {
        //API retrieving
        try {
          let userData = await retrieveAllData("userData", id);
          userData = userData.data;
          let activityData = await retrieveAllData("acivityData", id);
          activityData = activityData.data;
          let perfData = await retrieveAllData("performancesData", id);
          perfData = perfData.data;
          let sessionsData = await retrieveAllData("sessionsData", id);
          sessionsData = sessionsData.data;
          //once retrieved, we set the data to the response of the fetch API
          setData({ userData, activityData, perfData, sessionsData });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      } else {
        //Mockdata retrieving
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
