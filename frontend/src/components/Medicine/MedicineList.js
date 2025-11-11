import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicines, getCategories } from '../../services/api';
import MedicineCard from './MedicineCard';
import './Medicine.css';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchMedicines();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await getMedicines(selectedCategory, searchTerm);
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [selectedCategory, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="medicine-list-container">
      <h2>Browse Medicines</h2>
      
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="category-filter">
          <label>Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="medicine-grid">
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))
          ) : (
            <p className="no-results">No medicines found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineList;
