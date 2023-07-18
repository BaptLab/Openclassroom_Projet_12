import logo from "../../../assets/logo/logo.png";
import "./header.css";

function Header() {
  return (
    <header id="header">
      <img className="logo" src={logo} alt="logo SportSee"></img>
      <h1 id="Accueil" className="header-btn">
        Accueil
      </h1>
      <h1 id="Profil" className="header-btn">
        Profil
      </h1>
      <h1 id="Réglage" className="header-btn">
        Réglage
      </h1>
      <h1 id="Communauté" className="header-btn">
        Communauté
      </h1>
    </header>
  );
}

export default Header;
