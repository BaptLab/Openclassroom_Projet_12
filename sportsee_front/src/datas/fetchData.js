import { useEffect, useState } from "react";

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

export default function useFetch(id) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, [id]);
  return { loading, data };
}
