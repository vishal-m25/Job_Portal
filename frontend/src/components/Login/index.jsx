import React, { useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleJustifyClick = (value) => {
    setJustifyActive(value);
  };
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email: loginEmail, password: loginPassword };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed. Please try again.');
        return;
      }

      if (data.success) {
        alert('Login successful!');
        sessionStorage.setItem('userEmail', loginEmail); // Store email in sessionStorage
        navigate('/home');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.'+ error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      name: registerName,
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed. Please try again.');
        return;
      }

      if (data.success) {
        alert('Registration successful!');
        navigate('/home');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <><div className="main-page">
    <nav id="navbar">
      <h1 className="logo">
        Job<span>Hunt</span>
      </h1>
      </nav>
      </div>
      <div className="banner-img">
      <div className='continer'>
      <div className="tabs">
        <a
          href="#login"
          className={`tab-link ${justifyActive === 'tab1' ? 'active' : ''}`}
          onClick={() => handleJustifyClick('tab1')}
        >
          Login
        </a>
        <a
          href="#register"
          className={`tab-link ${justifyActive === 'tab2' ? 'active' : ''}`}
          onClick={() => handleJustifyClick('tab2')}
        >
          Register
        </a>
      </div>

      {/* Login Form */}
      <div id="login" className="tab-content" style={{ display: justifyActive === 'tab1' ? 'block' : 'none' }}>
        <form className='formm' onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email address</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="buttonn">Sign in</button>
        </form>
      </div>

      {/* Registration Form */}
      <div id="register" className="tab-content" style={{ display: justifyActive === 'tab2' ? 'block' : 'none' }}>
        <form className='formm' onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">Name</label>
            <input
              type="text"
              id="register-name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              type="text"
              id="register-username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="buttonn">Sign up</button>
        </form>
      </div>
    </div>
    </div></>
  );
}

export default Login;
