import React, { useState } from "react";
import './createaccount.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase";

const CreateAccount=()=>{
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[fname,setFname]=useState("");
  const[lname,setLname]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[success,setSuccess]=useState("");
  const navigate=useNavigate();

  const validateForm=()=>{
    if(!email|| !password|| !fname){
      setError("Please fill in all required fields");
      return false;
    }
    if(password.length<6){
      setError("Password should be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleRegister=async (e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if(!validateForm()){
      return;
    }

    setLoading(true);
    
    try {
      // Create user account
      const userCredential=await createUserWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;
      
      if (user){
        // Store additional user data in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname || "",
          photo: "",
          createdAt: new Date().toISOString(),
          userId: user.uid
        });

        toast.success("User Registered Successfully!", {
          position: "top-center",
        });
        
        // Navigate after showing success message
        setTimeout(()=>{
          navigate('/dashboard');
        }, 1500);
      }

    } catch(error){
      console.error('Registration error:', error);
      let errorMessage="An error occurred during registration";
      
      switch(error.code){
        case 'auth/email-already-in-use':
          errorMessage="This email is already registered";
          break;
        case 'auth/invalid-email':
          errorMessage="Invalid email address";
          break;
        case 'auth/operation-not-allowed':
          errorMessage="Email/password accounts are not enabled";
          break;
        case 'auth/weak-password':
          errorMessage="Password is too weak";
          break;
        default:
          errorMessage=error.message;
      }
      
      toast.error(errorMessage, {
        position:"bottom-center",
      });
      setError(errorMessage);
    } 
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="banner-section">
          <div className="image-content">
            <img src="https://supplier.meesho.com/images/Desktop-Pic_1.png" alt="Meesho supplier"/>
          </div>
          <div className="banner-text">
            <h2>Great Quality</h2>
            <h2>Great Margin</h2>
          </div>
        </div>

        <div className="form-section">
          <h1>Create Your Account</h1>
          {error&&<div className="error-message">{error}</div>}
          {success&&<div className="success-message">{success}</div>}
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>First Name</label>
              <input 
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e)=>setFname(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input 
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e)=>setLname(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="continue-btn"
              disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="login-section">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
