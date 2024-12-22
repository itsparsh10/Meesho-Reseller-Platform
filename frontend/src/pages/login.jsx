import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import './login.css';

const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!", {
        position: "top-center",
      });
      
      setTimeout(()=>{
        navigate('/myprofile');
      }, 1500);
      
    } catch(error){
      console.error('Login error:', error);
      let errorMessage = "An error occurred during login";
      
      switch(error.code){
        case 'auth/invalid-email':
          errorMessage = "Invalid email address";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled";
          break;
        case 'auth/user-not-found':
          errorMessage = "No account found with this email";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password";
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        position: "bottom-center",
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="banner-section">
          <div className="image-content">
            <img src="https://supplier.meesho.com/images/Desktop-Pic_1.png" alt="Meesho supplier"/>
          </div>
          <div className="banner-text">
            <h2>Welcome Back!</h2>
            <h2>Login to Continue</h2>
          </div>
        </div>

        <div className="form-section">
          <h1>Login</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="continue-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="create-account-section">
            <p>New to Meesho? <a href="/createaccount">Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
