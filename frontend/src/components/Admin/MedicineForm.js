import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMedicine, updateMedicine, getMedicine, getCategories } from '../../services/api';
import './Admin.css';

const MedicineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    expiryDate: '',
    dosage: '',
    sideEffects: '',
    prescription: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchMedicine();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMedicine = async () => {
    try {
      const response = await getMedicine(id);
      const medicine = response.data;
      setFormData({
        name: medicine.name,
        company: medicine.company,
        category: medicine.category,
        description: medicine.description,
        price: medicine.price,
        stock: medicine.stock,
        expiryDate: medicine.expiryDate.split('T')[0],
        dosage: medicine.dosage || '',
        sideEffects: medicine.sideEffects || '',
        prescription: medicine.prescription,
      });
    } catch (error) {
      console.error('Error fetching medicine:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateMedicine(id, formData);
        alert('Medicine updated successfully');
      } else {
        await createMedicine(formData);
        alert('Medicine created successfully');
      }
      navigate('/admin/medicines');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-form-container">
      <h2>{id ? 'Edit Medicine' : 'Add New Medicine'}</h2>
      
      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Medicine Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock *</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date *</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Dosage</label>
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Side Effects</label>
          <textarea
            name="sideEffects"
            value={formData.sideEffects}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="prescription"
              checked={formData.prescription}
              onChange={handleChange}
            />
            Prescription Required
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Medicine' : 'Create Medicine'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/admin/medicines')}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;
