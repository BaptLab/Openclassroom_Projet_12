import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import Login from "./components/Layout/Login/Login";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* the id of the user is being passed in the login component and being retrieved in the dashboard component*/}
        <Route path="/user" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default Routing;
