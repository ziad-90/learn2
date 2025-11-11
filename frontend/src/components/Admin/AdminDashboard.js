import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, getMedicines } from '../../services/api';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMedicines: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersResponse, medicinesResponse] = await Promise.all([
        getAllOrders(),
        getMedicines(),
      ]);

      const orders = ordersResponse.data;
      const medicines = medicinesResponse.data;

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      const pendingOrders = orders.filter(order => order.orderStatus === 'Pending').length;

      setStats({
        totalOrders: orders.length,
        totalMedicines: medicines.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-info">
            <h3>{stats.totalMedicines}</h3>
            <p>Total Medicines</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${stats.totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <div className="links-grid">
          <Link to="/admin/medicines" className="quick-link-card">
            <span className="link-icon">💊</span>
            <span>Manage Medicines</span>
          </Link>
          <Link to="/admin/orders" className="quick-link-card">
            <span className="link-icon">📋</span>
            <span>View All Orders</span>
          </Link>
          <Link to="/admin/medicines/new" className="quick-link-card">
            <span className="link-icon">➕</span>
            <span>Add New Medicine</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
