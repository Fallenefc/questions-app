import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../Assets/logo2.svg';
import './styles.css';

export default function LoggedOffHeader(): ReactElement {

  const history = useHistory();

  const handleClick = (event: any) => {
    event.target.name === 'login' ? history.push({pathname: '/login'}) : history.push({pathname: '/signup'});
  }

  return (
    <div className='landing-header'>
    <div className='left-content'>
      <span>About</span>
      <span>Contact</span>
    </div>
    <div className='middle-content'>
      <img src={logo} height='70px'></img>
    </div>
    <div className='right-content'>
      <button className='login-btn' name='login' onClick={handleClick}>Log In</button>
      <button className='signup-btn' name='signup' onClick={handleClick}>Sign Up</button>
    </div>
  </div>
  )
}
