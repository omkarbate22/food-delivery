import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"; // Corrected import

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext); // Ensure setToken is extracted from context
  const [currState, setCurrState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault(); // Ensure this is called first

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error with the request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container" action="">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='Close'
            className='close-icon'
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required />
          <div className="password-input-container">
            <input 
              name='password' 
              onChange={onChangeHandler} 
              value={data.password} 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Enter Password' 
              required 
            />
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye} 
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            />
          </div>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>Create a new Account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
