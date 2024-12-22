import "./payment.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [payments, setPayments]=useState([]);
  const [newPayment, setNewPayment]=useState({
    id: "",
    customerName: "",
    date: "",
    amount: "",
    status: "Pending",
    orderId: "",
    product: "",
    shippingAddress: "",
    paymentMethod: "UPI"
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/payment");
      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/payment", newPayment);
      setIsAddModalOpen(false);
      setNewPayment({
        id: "",
        customerName: "",
        date: "",
        amount: "",
        status: "Pending",
        orderId: "",
        product: "",
        shippingAddress: "",
        paymentMethod: "UPI"
      });
      fetchPayments();
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome" className="menu-item">Home</a>
          <a href="/order" className="menu-item">Orders</a>
          <a href="/return" className="menu-item">Returns</a>
          <a href="/inventory" className="menu-item">Inventory</a>
          <a href="/payment" className="menu-item active">Payments</a>
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
        <div className="payment-header">
          <h1>Payment Management</h1>
          <button className="add-payment-btn" onClick={() => setIsAddModalOpen(true)}>
            Add New Payment
          </button>
        </div>

        <div className="payments-grid">
          {payments.map((payment) => (
            <div key={payment._id} className="payment-card">
              <h3>Order #{payment.orderId}</h3>
              <div className="payment-details">
                <p><strong>Customer:</strong> {payment.customerName}</p>
                <p><strong>Amount:</strong> {payment.amount}</p>
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Status:</strong> <span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span></p>
                <p><strong>Product:</strong> {payment.product}</p>
                <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
                <p><strong>Shipping Address:</strong> {payment.shippingAddress}</p>
              </div>
            </div>
          ))}
        </div>

        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <h2>Add New Payment</h2>
                <form onSubmit={handleAddPayment}>
                  <input
                    type="number"
                    placeholder="ID"
                    value={newPayment.id}
                    onChange={(e) => setNewPayment({...newPayment, id: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={newPayment.customerName}
                    onChange={(e) => setNewPayment({...newPayment, customerName: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Order ID"
                    value={newPayment.orderId}
                    onChange={(e) => setNewPayment({...newPayment, orderId: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Product"
                    value={newPayment.product}
                    onChange={(e) => setNewPayment({...newPayment, product: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Shipping Address"
                    value={newPayment.shippingAddress}
                    onChange={(e) => setNewPayment({...newPayment, shippingAddress: e.target.value})}
                    required
                  />
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                    required
                  >
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                  <input
                    type="date"
                    value={newPayment.date}
                    onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                    required
                  />
                  <div className="modal-footer">
                    <button type="submit" className="save-btn">Add Payment</button>
                    <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
