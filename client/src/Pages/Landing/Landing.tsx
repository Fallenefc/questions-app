import React, { ReactElement } from "react";
import "./styles.css";
import landingLogo from "../../Assets/undraw_exams_g4ow.svg";
import { useHistory } from "react-router-dom";

export default function Landing(): ReactElement {

  const history = useHistory();

  const handleClick = () => {
    history.push({pathname: '/login'})
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-logo">
          <p>Exam App Name</p>
          <img src={landingLogo} width="100%" height="50%"></img>
        </div>
        <div className='login-or-signup'>
          <h1>Hello!</h1>
          <button onClick={handleClick}>Sign In</button>
          <h2>No account? <span>Create one</span></h2>
        </div>
      </div>
    </div>
  );
}
