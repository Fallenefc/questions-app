import React, { ReactElement, useEffect, useState } from "react";
import "./styles.css";
import pageImage from "../../Assets/undraw_online_test_gba7.svg";
import logoImg from "../../Assets/logo2.svg";
import { logIn } from "../../Services/ApiClientUser";
import { useHistory } from "react-router-dom";

export default function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleChange = (event: any) => {
    if (event.target.name === "password") setPassword(event.target.value);
    else setEmail(event.target.value);
  };

  const handleRedirect = () => {
    history.push({ pathname: "/signup" });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // make the API request for a login, store the token in the local storage
    logIn(email, password)
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        history.push({ pathname: "/" });
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Failed to log in!");
      });
    // reset
    setEmail("");
    setPassword("");
  };

  const redirectToHome = () => {
    history.push({ pathname: '/' })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="content-top">
            <div className="login-icon">
              <img src={logoImg} width="100px" onClick={redirectToHome}></img>
            </div>
          </div>
          <div className="content-middle">
            <div className="login-title">Log In</div>
            <div className="no-account">
              Need a Boilimax account? <span onClick={handleRedirect}>Create an account</span>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <p>Email</p>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
              ></input>
              <p>Password</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
              ></input>
              <span className="keep-logged">
                <span>Keep me logged in</span>
                <input type="checkbox"></input>
              </span>
              <button type="submit">Log In</button>
            </form>
          </div>
          <div className="login-container-footer">
            <span>Forgot username?</span>
            <span>Forgot password?</span>
          </div>
        </div>
        <div className="img-container">
          <img src={pageImage}>
          </img>
        </div>
      </div>
    </div>
  );
}
