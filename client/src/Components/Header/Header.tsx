import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Store/reducer";
import "./styles.css";
import logoImg from '../../Assets/logo2.svg'
import { addUser } from "../../Store/actions";
import { useHistory } from "react-router-dom";

export default function Header(): ReactElement<React.FC> {

  const user = useSelector((state: State) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push({pathname: '/'})
  }

  const handleLogout = () => {
    // change the user state to null again
    dispatch(addUser(null));
    localStorage.removeItem('token');
    history.push('/')
    window.location.reload(false);
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="website-logo" onClick={handleClick}>
          <img src={logoImg} height='100%' width='70px'></img>
        </div>
      </div>
      <div className="user-logout">
        <div className="welcome">Welcome, {user?.name}!</div>
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
