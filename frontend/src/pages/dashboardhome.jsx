import React from "react";
import "./dashboardhome.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Dashboardhome=()=>{
  const todoItems={
    pendingOrders: 7,
    downloadLabels: 5,
    outOfStock: 2,
    lowStock: 1,
  };
  const businessData={
    views: 150,
    orders: 12,
    inStockListings: 10,
    outstandingPayment: 7095,
  };
  return(
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome" className="menu-item active">
            Home
          </a>
          <a href="/order" className="menu-item">
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
      <div className="main-content">
        {/* Welcome Header */}
        <header className="welcome-header">
          <div>
            <h1>Welcome Sparsh</h1>
            <p>Manage and grow your business with Meesho</p>
          </div>
        </header>
        <section className="todo-section">
          <h2>To do list</h2>
          <div className="todo-grid">
            <div className="todo-item">
              <div className="todo-icon">📦</div>
              <div className="todo-details">
                <h3>Pending Orders</h3>
                <span className="todo-count">{todoItems.pendingOrders}</span>
              </div>
            </div>
            <div className="todo-item">
              <div className="todo-icon">🏷️</div>
              <div className="todo-details">
                <h3>Download Labels</h3>
                <span className="todo-count">{todoItems.downloadLabels}</span>
              </div>
            </div>
            <div className="todo-item">
              <div className="todo-icon">⚠️</div>
              <div className="todo-details">
                <h3>Out of Stock</h3>
                <span className="todo-count">{todoItems.outOfStock}</span>
              </div>
            </div>
            <div className="todo-item">
              <div className="todo-icon">📉</div>
              <div className="todo-details">
                <h3>Low Stock</h3>
                <span className="todo-count">{todoItems.lowStock}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="insights-section">
          <h2>Business Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h3>Views</h3>
              <p className="insight-value">{businessData.views}</p>
              <span className="trend positive"></span>
            </div>
            <div className="insight-card">
              <h3>Orders</h3>
              <p className="insight-value">{businessData.orders}</p>
              <span className="trend negative"></span>
            </div>
            <div className="insight-card">
              <h3>In Stock Listings</h3>
              <p className="insight-value">{businessData.inStockListings}</p>
            </div>
            <div className="insight-card">
              <h3>Outstanding Payment</h3>
              <p className="insight-value">
                ₹{businessData.outstandingPayment}
              </p>
              <span className="trend negative"></span>
            </div>
          </div>
        </section>
        <br></br>
        <section className="order-section">
          <div className="orderheader">
            <h2>Popular Products</h2>
            <div className="products-grid">
              <div className="product-card">
                <img src="https://www.sareespalace.com/image/cache/data/rani-cotton-silk-designer-kurti-233491-1000x1375.jpg" alt="Kurti" />
                <div className="product-info">
                  <h3>Designer Cotton Kurti</h3>
                  <p className="price">₹499</p>
                  <p className="sales">Sales: 150 units</p>
                  <div className="rating">
                    <span>★★★★☆</span>
                    <span className="reviews">(45 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="product-card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2k_UCte5rdNFmFdGgI1lTurT5_MYBnsYgxw&s" alt="Saree" />
                <div className="product-info">
                  <h3>Silk Saree</h3>
                  <p className="price">₹1,299</p>
                  <p className="sales">Sales: 120 units</p>
                  <div className="rating">
                    <span>★★★★★</span>
                    <span className="reviews">(38 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="product-card">
                <img src="https://assets.ajio.com/medias/sys_master/root/20221215/Lkhc/639b4161aeb269659cecb1bc/-473Wx593H-4936646560-multi-MODEL.jpg" alt="Watch" />
                <div className="product-info">
                  <h3>Smart Watch</h3>
                  <p className="price">₹2,999</p>
                  <p className="sales">Sales: 85 units</p>
                  <div className="rating">
                    <span>★★★★☆</span>
                    <span className="reviews">(29 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="product-card">
                <img src="https://www.darveys.com/blog/wp-content/uploads/2022/10/Top-Luxury-Designer-Bags-Michael-Kors-The-Bedford-Legacy-Signature-Bag.jpg" alt="Handbag" />
                <div className="product-info">
                  <h3>Designer Handbag</h3>
                  <p className="price">₹899</p>
                  <p className="sales">Sales: 95 units</p>
                  <div className="rating">
                    <span>★★★★☆</span>
                    <span className="reviews">(32 reviews)</span>
                  </div>
                </div>
              </div>
              {/* Additional Products */}
              <div className="product-card">
                <img src="data:image/jpeg;base64,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" alt="Shoes" />
                <div className="product-info">
                  <h3>Running Shoes</h3>
                  <p className="price">₹1,499</p>
                  <p className="sales">Sales: 75 units</p>
                  <div className="rating">
                    <span>★★★★★</span>
                    <span className="reviews">(28 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="product-card">
                <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MUVX3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713296133678" alt="Earbuds" />
                <div className="product-info">
                  <h3>Wireless Earbuds</h3>
                  <p className="price">₹1,999</p>
                  <p className="sales">Sales: 110 units</p>
                  <div className="rating">
                    <span>★★★★☆</span>
                    <span className="reviews">(42 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Dashboardhome;
