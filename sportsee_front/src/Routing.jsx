import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import Login from "./components/Layout/Login/Login";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<Dashboard />} /> {/* Correct the URL format here */}
      </Routes>
    </Router>
  );
}

export default Routing;
