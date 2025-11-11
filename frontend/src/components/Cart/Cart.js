import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../../services/api';
import './Cart.css';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await updateCartItem(itemId, newQuantity);
      setCart(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await removeFromCart(itemId);
      setCart(response.data);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      try {
        const response = await clearCart();
        setCart(response.data);
      } catch (error) {
        alert('Failed to clear cart');
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
        <button onClick={() => navigate('/medicines')} className="btn-continue">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img 
                  src={`https://via.placeholder.com/100?text=${item.medicine.name}`} 
                  alt={item.medicine.name} 
                />
              </div>
              <div className="item-details">
                <h3>{item.medicine.name}</h3>
                <p className="company">{item.medicine.company}</p>
                <p className="price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="item-quantity">
                <button 
                  onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  disabled={item.quantity >= item.medicine.stock}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button 
                onClick={() => handleRemoveItem(item._id)} 
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(cart.totalPrice + cart.totalPrice * 0.1 + 5).toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">
            Proceed to Checkout
          </button>
          <button onClick={handleClearCart} className="btn-clear">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
