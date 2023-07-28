import React, { useState } from 'react';
import './SignUp.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowLoginForm(false);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = {
      username: formData.get('name'),
      password: formData.get('password'),
    };
    const csrftoken = getCookie('csrftoken');
    axios
      .post('http://localhost:8000/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log('Login Response:', response.data);
        navigate('/home?loggedIn=true'); // Redirect to '/home' page after successful login
      })
      .catch((error) => {
        // Handle error response
        console.error('Login Error:', error);
      });
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const signupData = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      password2: formData.get('password2')
    };
    // Send signup request to the backend
    const csrftoken = getCookie('csrftoken');
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(signupData),
    };
    fetch('http://localhost:8000/api/register', request)
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Response:', data);
        navigate('/home');
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error:', error);
      });
  };
  
  return (
    <div className="login-container">
      <div className="box">
        <div className="page">
          <div className="header">
            <a id="login" className={showLoginForm ? 'active' : ''} onClick={handleLoginClick}>
              login
            </a>
            <a id="signup" className={!showLoginForm ? 'active' : ''} onClick={handleSignupClick}>
              signup
            </a>
          </div>
          <div id="errorMsg"></div>
          <div className="content">
            {showLoginForm ? (
              <form
                className="login"
                name="loginForm"
                onSubmit={handleLoginFormSubmit}
                method="POST"
              >
               
                <input type="text" name="name" id="logName" placeholder="Username" />
                <input type="password" name="password" id="logPassword" placeholder="Password" />
                <div id="check">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <br />
                <br />
               <input type="submit" value="Login" />
                 {/*<a href="#">Forgot Password?</a>*/}
              </form>
            ) : (
              <form
                className="signup"
                name="signupForm"
                onSubmit={handleSignupFormSubmit}
                method="POST"
              >
                <input type="email" name="email" id="signEmail" placeholder="Email" />
                <input type="text" name="username" id="signName" placeholder="Username" />
                <input type="password" name="password" id="signPassword" placeholder="Password" />
                <input
                  type="password"
                  name="password2"
                  id="signPassword1"
                  placeholder="Confirm password"
                />
                <br />
                <input type="submit" value="SignUp" />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default LoginPage;
