import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MediShop</h1>
          <p>Your trusted online medicine shopping platform</p>
          <Link to="/medicines" className="btn-hero">
            Browse Medicines
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose MediShop?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Wide Range of Medicines</h3>
              <p>Access to thousands of medicines from trusted manufacturers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment options for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices and regular discounts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Quality Assurance</h3>
              <p>All medicines are verified and quality checked</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple and user-friendly interface</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Popular Categories</h2>
          <div className="categories-grid">
            <Link to="/medicines?category=Pain Relief" className="category-card">
              Pain Relief
            </Link>
            <Link to="/medicines?category=Antibiotics" className="category-card">
              Antibiotics
            </Link>
            <Link to="/medicines?category=Vitamins & Supplements" className="category-card">
              Vitamins & Supplements
            </Link>
            <Link to="/medicines?category=Cold & Flu" className="category-card">
              Cold & Flu
            </Link>
            <Link to="/medicines?category=Digestive Health" className="category-card">
              Digestive Health
            </Link>
            <Link to="/medicines?category=Heart Health" className="category-card">
              Heart Health
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Start Shopping Today!</h2>
          <p>Create an account and enjoy the convenience of online medicine shopping</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-cta">
              Register Now
            </Link>
            <Link to="/medicines" className="btn-cta-secondary">
              Browse Medicines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
