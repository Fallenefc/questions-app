import React, { ReactElement } from "react";
import "./styles.css";
import landingHero from "../../Assets/landing-hero.svg";
import { useHistory } from "react-router-dom";
import logo from '../../Assets/logo2.svg';

export default function Landing(): ReactElement {

  const history = useHistory();

  const handleClick = () => {
    history.push({pathname: '/login'})
  }

  return (
    <div className='landing-page'>
      <div className='landing-container'>
        <div className='landing-header'>
          <div className='left-content'>
            <span>About</span>
            <span>Contact</span>
          </div>
          <div className='middle-content'>
            <img src={logo} height='50px'></img>
          </div>
          <div className='right-content'>
            <button className='login-btn'>Log In</button>
            <button className='signup-btn'>Sign Up</button>
          </div>
        </div>
        <div className='landing-content'>
          <div className='landing-text'>
            <h2>Short title description goes brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cumque minus amet cupiditate molestias, ut quo officia dolor, veniam sed vel doloremque corporis nihil et itaque fuga numquam expedita quis.</p>
            <button className='login-btn'>Log In</button>
            <button className='signup-btn'>Sign Up</button>
          </div>
          <div className='landing-image'>
            <img src={landingHero} height='500px'></img>
          </div>
        </div>
        <footer>
          hey
        </footer>
      </div>
    </div>
    /* // <div className="landing-page">
    //   <div className="landing-container">
    //     <div className="landing-logo">
    //       <p>Exam App Name</p>
    //       <img src={landingLogo} width="100%" height="50%"></img>
    //     </div>
    //     <div className='login-or-signup'>
    //       <h1>Hello!</h1>
    //       <button onClick={handleClick}>Sign In</button>
    //       <h2>No account? <span>Create one</span></h2>
    //     </div>
    //   </div>
    // </div> */
  );
}
