import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../../Assets/logo2.svg";
import pageImage from "../../Assets/undraw_welcome_cats_thqn.svg";
import AlertModal from "../../Components/AlertModal/AlertModal";
import AlertText from "../../Components/AlertText/AlertText";
import { signUp } from "../../Services/ApiClientUser";
import "./styles.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [name, setName] = useState("");
  const [validationObj, setValidationObj] = useState ({
    email: true,
    password: true,
    passwordConf: true,
    name: true
  })

  const [alertModal, setAlertModal] = useState(false);
  const handleAlertModal = () => {
    setAlertModal(false);
  }

  const history = useHistory();

  const handleSubmit = async (event: any) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    event.preventDefault();
    let isAnythingInvalid = false;
    const validationObjCopy = {...validationObj};
    if (!email.match(emailRegex)) {
      validationObjCopy.email = false;
      isAnythingInvalid = true;
    }
    if (name === '') {
      validationObjCopy.name = false;
      isAnythingInvalid = true;
    }
    if (password !== passwordConf) {
      validationObjCopy.passwordConf = false;
      isAnythingInvalid = true;
    }
    if (password.length < 6 || password.length > 18) {
      validationObjCopy.password = false;
      isAnythingInvalid = true;
    }
    if (isAnythingInvalid) {
      setValidationObj(validationObjCopy);
      return;
    };
    // add email validation regex
    const response = await signUp({
      username: email,
      password: password,
      name: name,
    });
    if (!response) {
      setAlertModal(true);
      return;
    } else {
      alert("Used signed up successfully!");
      history.push({ pathname: "/login" });
    }
    console.log(email, password, passwordConf, name);
  };

  const handleChange = (event: any) => {
    if (event.target.name === "password") setPassword(event.target.value);
    else if (event.target.name === "passwordConf")
      setPasswordConf(event.target.value);
    else if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "name") setName(event.target.value);
  };

  const handleRedirect = () => {
    history.push({ pathname: "/login" });
  };

  const redirectToHome = () => {
    history.push({ pathname: '/' })
  }

  return (
    <div className="login-page">
      {alertModal ? <AlertModal text='Failed to Sign up. Email most likely already exists' handleAlertModal={handleAlertModal}/> : null}
      <div className="login-container">
        <div className="img-container">
          <img src={pageImage} alt='hero'></img>
        </div>
        <div className="signup-form-container">
          <div className="content-top">
            <div className="login-icon">
              <img src={logoImg} width="100px" onClick={redirectToHome} alt='logo'></img>
            </div>
          </div>
          <div className="content-middle">
            <div className="login-title">Sign Up</div>
            <div className="no-account">
              Already have a Boilimax account?{" "}
              <span onClick={handleRedirect}>Login here!</span>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <p>Email</p>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
              ></input>
              {validationObj.email ? null : <AlertText text={'Email format is not valid'} />}
              <p>Password</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
              ></input>
              {validationObj.password ? null : <AlertText text={'Password must have between 6 and 18 characters'} />}
              <p>Confirm your password</p>
              <input
                type="password"
                name="passwordConf"
                onChange={handleChange}
                value={passwordConf}
              ></input>
              {validationObj.passwordConf ? null : <AlertText text={'Passwords do not match'} />}
              <p>Name</p>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={name}
              ></input>
              {validationObj.name ? null : <AlertText text={'Name cannot be empty'} />}
              <span className="keep-logged">
                <span>I agree with the <span className='green'>Terms and Conditions</span></span>
                <input type="checkbox"></input>
              </span>
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="login-container-footer">
          </div>
        </div>
      </div>
    </div>
    // <div className='signup-page'>
    //   <div className='signup-container'>
    //     <div className='logo-side'>
    //       <img src={logoImg} className='logo-img'></img>
    //       <img src={pageImage}></img>
    //     </div>
    //     <div className='signup-form-container'>
    //       <div className='signup-title'>Sign Up</div>
    //       <form className='signup-form' onSubmit={handleSubmit}>
    //       <p>Name</p>
    //         <input type='text' name='name' onChange={handleChange} value={name}></input>
    //         <p>Email</p>
    //         <input type='text' name='email' onChange={handleChange} value={email}></input>
    //         <p>Password</p>
    //         <input type='password' name='password' onChange={handleChange} value={password}></input>
    //         <p>Confirm your Password</p>
    //         <input type='password' name='passwordConf' onChange={handleChange} value={passwordConf}></input>
    //         <p>I agree with the Terms of Service            <input type='checkbox'></input></p>
    //         <button type='submit'>Sign Up</button>
    //       </form>
    //       <div className='signup-container-footer'>
    //         Already have an account? <span onClick={handleRedirect}>Log in here</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
