import React, { ReactElement, useState } from "react";
import "./styles.css";
import landingLogo from "../../Assets/undraw_exams_g4ow.svg";

export default function Landing(): ReactElement {

  const [loginInfo, setLoginInfo] = useState({username: '', password: ''});

  const handleChange = (event: any): void => {
    event.target.name === 'username' ? setLoginInfo({...loginInfo, username: event.target.value}) : setLoginInfo({...loginInfo, password: event.target.value})
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    console.log(loginInfo);
    setLoginInfo({username: '', password: ''})
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-logo">
          <p>Exam App Name</p>
          <img src={landingLogo} width="100%" height="50%"></img>
        </div>
        <div className="landing-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-text">Log In</span>
            <span className="username">
              Username
              <input type="text" id="username" name='username' onChange={handleChange} value={loginInfo.username}></input>
            </span>
            <span className="password">
              Password
              <input type="password" id="password" name='password' onChange={handleChange} value={loginInfo.password}></input>
            </span>
            <span>
              <button type="submit" id="login-submit-button">
                Log In
              </button>
            </span>
          </form>
          <div className="signup-here">
            Does not have an account?<span>Sign up here.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
