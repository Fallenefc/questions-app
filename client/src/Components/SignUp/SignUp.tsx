import React, { ReactElement, useState } from "react";
import './styles.css'

interface Props {
  toggle: any;
}

export default function SignUp({ toggle }: Props): ReactElement {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
  });

  const handleChange = (event: any): void => {
    event.target.name === "username"
      ? setLoginInfo({ ...loginInfo, username: event.target.value })
      : setLoginInfo({ ...loginInfo, password: event.target.value });
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    console.log(loginInfo);
    setLoginInfo({
      username: "",
      password: "",
      passwordConf: "",
      email: "",
    });
  };

  return (
    <div className="landing-content">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-text">Sign Up</span>
        <span className="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={loginInfo.username}
          ></input>
        </span>
        <span className="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={loginInfo.email}
          ></input>
        </span>
        <span className="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={loginInfo.password}
          ></input>
        </span>
        <span className="password-conf">
          Confirm your password
          <input
            type="password-conf"
            id="password-conf"
            name="password-conf"
            onChange={handleChange}
            value={loginInfo.passwordConf}
          ></input>
        </span>
        <span>
          <button type="submit" id="login-submit-button">
            Sign Up
          </button>
        </span>
      </form>
      <div className="signup-here">
        Already have an account?<span onClick={toggle}>Sign in here.</span>
      </div>
    </div>
  );
}
