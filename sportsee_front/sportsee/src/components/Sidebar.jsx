import SidebarIcons from "./SidebarIcons";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <nav className="nav-bar">
      <div className="icons-container">
        <SidebarIcons sport="gym"></SidebarIcons>
        <SidebarIcons sport="biking"></SidebarIcons>
        <SidebarIcons sport="swimming"></SidebarIcons>
        <SidebarIcons sport="yoga"></SidebarIcons>
      </div>
      <span className="copyright">Copyright, SportSee 2020</span>
    </nav>
  );
}

export default Sidebar;
