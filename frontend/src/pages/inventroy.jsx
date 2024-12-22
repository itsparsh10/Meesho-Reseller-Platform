import "./inventory.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Inventory=()=>{
  const [products,setProducts]=useState([]);
  const [newProduct,setNewProduct]=useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    brand: "",
    image: ""
  });
  const [isAddModalOpen,setIsAddModalOpen]=useState(false);
  const [sortField,setSortField]=useState("productName");
  const [sortOrder,setSortOrder]=useState("asc");

  useEffect(() => {
    fetchProducts();
  },[]);
  const fetchProducts=async()=>{
    try{
      const response = await axios.get("http://localhost:8000/inventory/all");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/inventory/add",newProduct);
      setIsAddModalOpen(false);
      setNewProduct({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        brand: "",
        image: ""
      });
      fetchProducts();
    } catch(error){
      console.error("Error adding product:",error);
    }
  };

  const handleUpdateQuantity=async(id, quantity)=>{
    try{
      await axios.patch(`http://localhost:8000/inventory/update/${id}`,{ quantity });
      fetchProducts();
    } catch(error){
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteProduct=async(id)=>{
    try{
      await axios.delete(`http://localhost:8000/inventory/delete/${id}`);
      fetchProducts();
    } catch(error){
      console.error("Error deleting product:", error);
    }
  };

  const handleSort=(field)=>{
    const newOrder=field===sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    
    const sortedProducts=[...products].sort((a, b)=>{
      if (newOrder === "asc") {
        return a[field]>b[field] ? 1 : -1;
      }
      return a[field]<b[field] ? 1 : -1;
    });
    
    setProducts(sortedProducts);
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
          <a href="/inventory" className="menu-item active">Inventory</a>
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

      <div className="main-content">
        <div className="inventory-header">
          <h1>Inventory Management</h1>
          <button className="add-product-btn" onClick={()=>setIsAddModalOpen(true)}>
            Add New Product
          </button>
        </div>
        <div className="products-grid">
          {products.map((product)=>(
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price}</p>
              <p className="stock">Stock: {product.quantity}</p>
              <p className="description">{product.description}</p>
              <div className="product-actions">
                <input
                  type="number"
                  min="0"
                  value={product.quantity}
                  onChange={(e) => handleUpdateQuantity(product._id, e.target.value)}
                  className="quantity-input"
                />
                <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <h2>Add New Product</h2>
                <form onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.productName}
                    onChange={(e)=>setNewProduct({...newProduct, productName: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e)=>setNewProduct({...newProduct, category: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e)=>setNewProduct({...newProduct, quantity: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Brand"
                    value={newProduct.brand}
                    onChange={(e)=>setNewProduct({...newProduct, brand: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e)=>setNewProduct({...newProduct, description: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e)=>setNewProduct({...newProduct, image: e.target.value})}
                    required
                  />
                  <div className="modal-footer">
                    <button type="submit" className="save-btn">Add Product</button>
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

export default Inventory;
