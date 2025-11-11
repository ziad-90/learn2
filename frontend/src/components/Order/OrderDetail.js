import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/api';
import './Order.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="order-detail-container">
      <h2>Order Details</h2>
      
      <div className="order-detail-card">
        <div className="detail-section">
          <h3>Order Information</h3>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> 
            <span className={`status-badge status-${order.orderStatus.toLowerCase()}`}>
              {order.orderStatus}
            </span>
          </p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> 
            <span className={order.isPaid ? 'paid' : 'unpaid'}>
              {order.isPaid ? 'Paid' : 'Pending'}
            </span>
          </p>
        </div>

        <div className="detail-section">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
          <p>{order.shippingAddress.zipCode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="detail-section">
          <h3>Order Items</h3>
          <div className="order-items">
            {order.orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-name">
                  {item.name} x {item.quantity}
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items:</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
