import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";

const Order = () => {
  // State to store all orders
  const [customerOrders, setCustomerOrders] = useState([]);

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/orders");
      setCustomerOrders(response.data.orders); // Store orders in state
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // Fetch orders on page load
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
          <a href="/order" className="menu-item active">
            Orders
          </a>
          <a href="/return" className="menu-item">
            Returns
          </a>
          <a href="/inventory" className="menu-item">
            Inventory
          </a>
          <a href="/payment" className="menu-item">
            Payments
          </a>
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
        <header className="order-header">
          <h1>Customer Orders</h1>
        </header>

        {/* Display List of Orders */}
        <section className="orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
          </div>

          <div className="orders-list">
            {customerOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="customer-info">
                    <h2>{order.customerName}</h2>
                    <span className="order-id">Order #{order._id}</span>
                  </div>
                  <span
                    className={`status ${order.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {order.status || "New Order"}
                  </span>
                </div>
                <div className="order-details">
                  <div className="detail-row">
                    <span className="label">Product</span>
                    <span className="value">{order.productname}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Quantity</span>
                    <span className="value">{order.quantity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Amount</span>
                    <span className="value amount">₹{order.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Address</span>
                    <span className="value address">
                      {order.customerAddress}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Order Date</span>
                    <span className="value">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="order-actions">
                  <a href="https://web.whatsapp.com/" className="contact-btn">
                    <i className="fas fa-comment"></i>
                    Contact Customer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Order;
