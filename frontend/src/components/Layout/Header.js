import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>MediShop</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/medicines">Medicines</Link>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard">Dashboard</Link>
                  <Link to="/admin/medicines">Manage Medicines</Link>
                  <Link to="/admin/orders">All Orders</Link>
                </>
              ) : (
                <>
                  <Link to="/cart">Cart</Link>
                  <Link to="/orders">My Orders</Link>
                </>
              )}
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
