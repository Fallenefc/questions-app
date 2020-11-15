import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import logoImg from '../../Assets/logo.svg'
import AlertModal from '../../Components/AlertModal/AlertModal';
import pageImage from '../../Assets/forgot-password.svg';
import './styles.css'

const ResetPassword = () => {

  const [alertModal, setAlertModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleAlertModal = () => {
    setAlertModal(false);
  }

  const history = useHistory();
  const redirectToHome = () => {
    history.push({ pathname: '/' })
  }

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e: any) => {
    console.log(e);
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
              <div className="login-title">Forgot Password?</div>
              <div className='reset-text'>Just write your email on the field below. If the email submitted is a valid registered email, a link will be sent to the email address with the instructions to reset your password!</div>
              <div className="no-account">
                {alertModal ? <AlertModal text='Invalid email/password' handleAlertModal={handleAlertModal}/> : null}
                Remember the password? <span onClick={() => console.log('not implemented')}>Log in here</span>
              </div>
              <form className="login-form" onSubmit={handleSubmit}>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={email}
                ></input>
                <button type="submit">Reset Password</button>
              </form>
            </div>
            <div className="login-container-footer">
              <span>Alternatively, Sign up here</span>
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

export default ResetPassword
