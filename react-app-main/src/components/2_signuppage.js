import React, { useState } from "react";
import "../css/2_signuppage.css";
import Footer from "../common/footer";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate ();
  const [role, setRole] = useState("user");
  const handleSignUp = async(event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Please enter all the required details");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match, try again");
      return;
    }

    const userData = {
      'username': email,
      'password': password,
      'email': email,
      'is_admin': role === "admin"
    };

    try {
      await axios.post('http://127.0.0.1:8000/register/', userData);
      toast.success("Registration successful!");
      navigate('/login');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer /> 
      <div className='innerdiv'>
        <div className="signup-page">
          <div className='safezone_h1'>
            <div className="safezone">Safe Zone <span className="uofI">Uof I</span></div>
          </div>

          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Add password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <div className="signup-role-dropdown">
            <label htmlFor="role" className="signupLabel">Sign up as:</label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
            <div className='buttondiv'>
              <button type="submit" style={{ cursor: "pointer" }}>Signup</button>
            </div>
          </form>

          <p className='loginlink'>
            <Link to="/login">Already have an account? Login</Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SignUpPage;
