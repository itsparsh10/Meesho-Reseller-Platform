import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";
const Return = () => {
  const [returnedProducts,setReturnedProducts]=useState([]); 
  const [loading, setLoading]=useState(true); 

  const fetchReturnedProducts=async()=>{
    try{
      const response=await axios.get("http://localhost:8000/return");
      setReturnedProducts(response.data.returns || []);
    } 
    catch(error){
      console.error("Error fetching returned products:",error);
      setReturnedProducts([]); 
    }
    finally{
      setLoading(false); 
    }
  };
  useEffect(()=>{
    fetchReturnedProducts();
  },[]);
  
  // Calculate stats
  const totalReturns = returnedProducts.length;
  const completedReturns = returnedProducts.filter(
    (product) => product.status === "Returned").length; 
  const inProgressReturns = totalReturns - completedReturns; // Calculate in-progress returns

  return(
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome" className="menu-item">
            Home
          </a>
          <a href="/order" className="menu-item">
            Orders
          </a>
          <a href="/return" className="menu-item active">
            Returns
          </a>
          <a href="/inventory" className="menu-item">
            Inventory
          </a>
          <a href="/payment" className="menu-item">Payments</a>
          <a href="/ai" className="menu-item">AI Assistant</a>
          <a href="/learn" className="menu-item">Learn</a>
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="/myprofile" className="menu-item">MyProfile</a>
          <a href="#" className="menu-item">Support</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header Section */}
        <header className="order-header">
          <h1>Returned Products</h1>
          {/* Display Statistics */}
          
        </header>

        {/* Returned Products List */}
        <section className="orders-section">
          {loading ? (
            // Show loading message while data is being fetched
            <p className="no-orders">Loading...</p>
          ) : returnedProducts.length === 0 ? (
            // Show message if no products are found
            <p className="no-orders">No returned products found.</p>
          ) : (
            // Show the list of returned products
            <div className="orders-list">
              {returnedProducts.map((product) => (
                <div key={product._id} className="order-card">
                  <div className="order-header">
                    <div className="customer-infoo">
                      <h1>{product.productName}</h1>
                      <span className="order-id">Order #{product.orderNumber}</span>
                    </div>
                    {/* Status tag with dynamic styling */}
                    <span className={`status ${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span className="label">Return Date:</span>
                      <span className="value">{product.returnDate || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Price:</span>
                      <span className="value">₹{product.price || "N/A"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Return;

