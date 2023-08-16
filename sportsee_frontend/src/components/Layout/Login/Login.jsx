import UserBtn from "../../Buttons/UserBtn";
import logo from "../../../assets/logo/logo.png";
import "./login.css";

//First page

function Login() {
  return (
    <main className="main-login-page">
      <div className="content-container">
        <img className="logo" src={logo} alt="logo SportSee"></img>
        <span className="introduction">Choississez votre utilisateur :</span>
        <div className="btn-container">
          <UserBtn idUser={12} />
          <UserBtn idUser={18} />
        </div>
      </div>
    </main>
  );
}

export default Login;
