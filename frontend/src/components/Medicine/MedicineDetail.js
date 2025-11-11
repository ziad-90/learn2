import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getMedicine, addToCart } from '../../services/api';
import './Medicine.css';

const MedicineDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const response = await getMedicine(id);
      setMedicine(response.data);
    } catch (error) {
      console.error('Error fetching medicine:', error);
    } finally {
      setLoading(false);
    }
  };

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
      await addToCart(medicine._id, quantity);
      alert('Added to cart successfully!');
      navigate('/cart');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!medicine) {
    return <div className="error">Medicine not found</div>;
  }

  return (
    <div className="medicine-detail-container">
      <div className="medicine-detail">
        <div className="detail-image">
          <img src={`https://via.placeholder.com/400x300?text=${medicine.name}`} alt={medicine.name} />
        </div>
        <div className="detail-info">
          <h2>{medicine.name}</h2>
          <p className="company">Company: {medicine.company}</p>
          <p className="category">Category: {medicine.category}</p>
          <p className="price">Price: ${medicine.price.toFixed(2)}</p>
          <p className="description">{medicine.description}</p>
          
          {medicine.dosage && (
            <p className="dosage"><strong>Dosage:</strong> {medicine.dosage}</p>
          )}
          
          {medicine.sideEffects && (
            <p className="side-effects"><strong>Side Effects:</strong> {medicine.sideEffects}</p>
          )}
          
          <p className="expiry">
            <strong>Expiry Date:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}
          </p>
          
          {medicine.prescription && (
            <p className="prescription-required">⚠️ Prescription Required</p>
          )}
          
          <p className={`stock ${medicine.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {medicine.stock > 0 ? `In Stock: ${medicine.stock}` : 'Out of Stock'}
          </p>

          {medicine.stock > 0 && user && user.role !== 'admin' && (
            <div className="add-to-cart-section">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                max={medicine.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button onClick={handleAddToCart} className="btn-add-cart">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
