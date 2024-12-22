// Homepage.js
import React from 'react';
import './homepage.css';
const homepage=()=>{
  return(
    <div className="homepage">
      <header className="header">
        <h1 className="brand">meesho</h1>
        <nav className="nav-links">
          <a href="#">Sell Online</a>
          <a href="#">How it works</a>
          <a href="#">Pricing & Commission</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Grow Business</a>
          <a href="#">Don't have GST?</a>
          <a href='/login'><button className="login-btn">Login</button></a>
          <a href='/createaccount'><button className="start-selling-btn">Start Selling</button></a>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </nav>
      </header>
      <main className="hero">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="main-heading">
                <br></br>
              Sell online to 14 Cr+ customers at  {" "}
              <span className="pink-text">0% Commission</span>
            </h1>
            <p className="subtitle">
              Become a Meesho seller and grow your business across India
            </p>
            <div className="gstin-box">
              <span className="new-badge">New!</span>
              <span>Don't have a GSTIN or have a Composition GSTIN?</span>
              <p>You can still sell on Meesho. <a href="#" className="pink-link">Click here</a> to know more.</p>
            </div>
            <div className="phone-input-box">
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input 
                  type="text" 
                  placeholder="Enter Your Mobile Number"
                  maxLength="10"
                />
              </div>
              <a href='/createaccount'><button className="start-selling-btn">Start Selling</button></a>
            </div>
          </div>
          <div className="image-content">
            <img 
              src="https://supplier.meesho.com/images/Desktop-Pic.png" 
              alt="Meesho Seller App"
              className="hero-image"
            />
          </div>
        </div>
      </main>
      <div className="stats-container">
        <div className="stat-box">
          <h2 className="pink-text">11 Lakh+</h2>
          <p>Trust Meesho to sell online</p>
        </div>
        <div className="stat-box">
          <h2 className="pink-text">14 Crore+</h2>
          <p>Customers buying across India</p>
        </div>
        <div className="stat-box">
          <h2 className="pink-text">19000+</h2>
          <p>Pincode Supported for delivery</p>
        </div>
        <div className="stat-box">
          <h2 className="pink-text">700+</h2>
          <p>Categories to sell online</p>
        </div>
      </div>
    </div>
  );
};
export default homepage;
