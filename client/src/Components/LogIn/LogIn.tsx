import React, { ReactElement, useState } from "react";
import {useHistory} from 'react-router-dom'
import './styles.css'

interface Props {
  toggle: any
}

export default function LogIn({toggle}: Props): ReactElement {

  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({username: '', password: ''});

  const handleChange = (event: any): void => {
    event.target.name === 'username' ? setLoginInfo({...loginInfo, username: event.target.value}) : setLoginInfo({...loginInfo, password: event.target.value})
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    console.log(loginInfo);
    setLoginInfo({username: '', password: ''})
  }


  const testClick = () => {
    localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFjNTY3ODFlMjU4MjM3MzIxMjQwMjEiLCJpYXQiOjE2MDUxMzQwNzEsImV4cCI6MTYwNTIyMDQ3MX0.78jhutlR3t6N5mrx4sJrw3QEt2pJQ_42H6sOe2i4BuI')
    history.push('/')
  }

  return (
    <div className="landing-content">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-text">Log In</span>
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
        <span>
          <button type="submit" id="login-submit-button" onClick={testClick}>
            Log In
          </button>
        </span>
      </form>
      <div className="signup-here">
        Does not have an account?<span onClick={toggle}>Sign up here.</span>
      </div>
    </div>
  );
}
