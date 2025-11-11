import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../services/api';
import './Order.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-list-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6)}</span>
                <span className={`order-status status-${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="order-info">
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Items:</strong> {order.orderItems.length}</p>
                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
              </div>
              <button 
                onClick={() => navigate(`/orders/${order._id}`)}
                className="btn-view-order"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
