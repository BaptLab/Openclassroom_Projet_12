import { NavLink } from "react-router-dom";
import "./userbtn.css";
import PropTypes from "prop-types";

//Check if the props is indeed an number
UserBtn.propTypes = {
  idUser: PropTypes.number.isRequired,
};

function UserBtn(props) {
  return (
    //Btn redirect to Dashboard w/ the id selected passed into the URL
    <NavLink to={`/user?id=${props.idUser}`} className="user-btn-container">
      <span className="user-name">user n°{props.idUser}</span>
    </NavLink>
  );
}

export default UserBtn;
