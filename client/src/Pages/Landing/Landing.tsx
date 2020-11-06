import React, { ReactElement, useEffect, useState } from "react";
import "./styles.css";
import landingLogo from "../../Assets/undraw_exams_g4ow.svg";
import LogIn from "../../Components/LogIn/LogIn";
import SignUp from "../../Components/SignUp/SignUp";

export default function Landing(): ReactElement {

  const [logIn, setLogIn] = useState(true);

  const toggleLogInSignUp = () => {
    setLogIn((current) => !current)
  }

  useEffect(() => { // Just a test function
    console.log(logIn)
  })

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-logo">
          <p>Exam App Name</p>
          <img src={landingLogo} width="100%" height="50%"></img>
        </div>
        {logIn ? <LogIn toggle={toggleLogInSignUp}/> : <SignUp toggle={toggleLogInSignUp}/>}
      </div>
    </div>
  );
}
