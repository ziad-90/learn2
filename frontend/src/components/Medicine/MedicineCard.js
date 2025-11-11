import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { addToCart } from '../../services/api';
import './Medicine.css';

const MedicineCard = ({ medicine }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'admin') {
      alert('Admin cannot add items to cart');
      return;
    }

    try {
      await addToCart(medicine._id, 1);
      alert('Added to cart successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleViewDetails = () => {
    navigate(`/medicines/${medicine._id}`);
  };

  return (
    <div className="medicine-card">
      <div className="medicine-image">
        <img src={`https://via.placeholder.com/200x150?text=${medicine.name}`} alt={medicine.name} />
      </div>
      <div className="medicine-info">
        <h3>{medicine.name}</h3>
        <p className="company">{medicine.company}</p>
        <p className="category">{medicine.category}</p>
        <p className="price">${medicine.price.toFixed(2)}</p>
        <p className={`stock ${medicine.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {medicine.stock > 0 ? `In Stock: ${medicine.stock}` : 'Out of Stock'}
        </p>
        <div className="card-actions">
          <button onClick={handleViewDetails} className="btn-view">
            View Details
          </button>
          {medicine.stock > 0 && user && user.role !== 'admin' && (
            <button onClick={handleAddToCart} className="btn-add-cart">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
