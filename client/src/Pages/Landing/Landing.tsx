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
            <img src={logo} height='70px'></img>
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
            <button className='login-btn' id="bottom-login">Log In</button>
            <button className='signup-btn'>Sign Up</button>
          </div>
          <div className='landing-image'>
            <img src={landingHero} height='500px'></img>
          </div>
        </div>
        <footer className='footer-distributed'>
        <div className="footer-left">
        {/* <img src="img/logo.png"></img> */}
        <h3>
          About<span> Me</span>
        </h3>

        <p className="footer-links">
          <a href="#">Home</a>|<a href="#">About</a>|<a href="#">Contact</a>
        </p>

        <p className="footer-company-name">
          © 2020 FallenEFC
        </p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>blablabla</span>
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>Phone?</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@eduonix.com">arylmoraesn@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About Me</span>
          Web developer
        </p>
        <div className="footer-icons">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
          <i className="fa fa-github"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-youtube"></i>
          </a>
        </div>
      </div>
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
