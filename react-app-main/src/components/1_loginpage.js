import React, { useState } from "react";
import "../css/1_loginpage.css";
import { Link, useNavigate } from 'react-router-dom'; 
import Footer from "../common/footer";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useUser } from './UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const { setUser } = useUser();
  const handleLogin = async (event) => {
    event.preventDefault();
    const isEmailValid = email.length > 0;
    const isPasswordValid = password.length > 0;
    if (!isEmailValid || !isPasswordValid) {
      alert("Please enter both email and password.");
      return;
    }
    const userData = {
      'username': email,
      'password': password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', userData);
      setUser({ token: response.data.token, is_admin: response.data.isAdmin });
      toast.success("Login successful!");
      navigate('/'); 
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className='Inner-div'>
        <div className="login-page">
          <div className="safezone_h1">
            <div className="safezone">Safe Zone <span className="uofI">Uof I</span></div>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="email" 
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className='login-submit-div'>
              <button type="submit" style={{ cursor: "pointer" }}>Login</button>
            </div>
          </form>

          <p>
            <Link to="/signup" className="signup-link">Don't have an account? Sign up here!</Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
