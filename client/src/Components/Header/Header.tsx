import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Store/reducer";
import "./styles.css";
import logoImg from '../../Assets/logo2.svg'

export default function Header(): ReactElement<React.FC> {

  const user = useSelector((state: State) => state.user);

  const handleLogout = () => {
    // change the user state to null again
    localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="website-logo">
          <img src={logoImg} height='100%' width='70px'></img>
        </div>
      </div>
      <div className="user-logout">
        <div className="welcome">Welcome, {user?.username}!</div>
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
