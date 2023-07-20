import { NavLink } from "react-router-dom";
import "./userbtn.css";

function UserBtn(props) {
  return (
    <NavLink to={`/user?id=${props.idUser}`} className="user-btn-container">
      <span className="user-name">user n°{props.idUser}</span>
    </NavLink>
  );
}

export default UserBtn;
