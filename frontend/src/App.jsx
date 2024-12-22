import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/createaccount';
import Homepage from './pages/homepage';
import Dashboardhome from './pages/dashboardhome';
import Login from './pages/login';
import MyProfile from './pages/myprofile';
import Order from './pages/order';
import Payment from './pages/payment';
import Return from './pages/return';
import Inventory from './pages/inventroy';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AI from './pages/ai';
import Learn from './pages/learn';
function App() {
  return (
    <Router>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/dashboardhome" element={<Dashboardhome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/return" element={<Return />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/learn" element={<Learn/>}/>
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
}
export default App;
