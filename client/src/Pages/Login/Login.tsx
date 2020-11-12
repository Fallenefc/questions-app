import React, { ReactElement, useEffect, useState } from 'react'
import './styles.css'
import pageImage from '../../Assets/undraw_online_test_gba7.svg'
import logoImg from '../../Assets/logo2.svg'
import { logIn } from '../../Services/ApiClientUser';

interface Props {
  
}

export default function Login({}: Props): ReactElement {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: any) => {
    if (event.target.name === 'password') setPassword(event.target.value);
    else setEmail(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // make the API request for a login, store the token in the local storage
    logIn(email, password).then((response) => {
      console.log(response)
      localStorage.setItem('token', `Bearer ${response.data.token}`)
    }).catch((err) => {
      alert('Failed to log in!')
    })
    // reset 
  }

  useEffect(() => { // Testing purposes only
    console.log(email, password)  
  })

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='logo-side'>
          <img src={logoImg} className='logo-img'></img>
          <img src={pageImage}></img>
        </div>
        <div className='login-form-container'>
          <div className='login-title'>Log In</div>
          <form className='login-form' onSubmit={handleSubmit}>
            <p>Email</p>
            <input type='text' name='email' onChange={handleChange} value={email}></input>
            <p>Password</p>
            <input type='password' name='password' onChange={handleChange} value={password}></input>
            <p>Remember Me            <input type='checkbox'></input></p>
            <button type='submit'>Log In</button>
            <button type='submit'>Forgot Password</button>
          </form>
          <div className='login-container-footer'>
            Already have an account? <span>Log in here</span>
          </div>
        </div>
      </div>
    </div>
  )
}
