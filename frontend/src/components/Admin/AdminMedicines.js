import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMedicines, deleteMedicine } from '../../services/api';
import './Admin.css';

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        setMedicines(medicines.filter(med => med._id !== id));
        alert('Medicine deleted successfully');
      } catch (error) {
        alert('Failed to delete medicine');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/medicines/edit/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-medicines">
      <div className="page-header">
        <h2>Manage Medicines</h2>
        <button 
          onClick={() => navigate('/admin/medicines/new')}
          className="btn-add"
        >
          Add New Medicine
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.company}</td>
                <td>{medicine.category}</td>
                <td>${medicine.price.toFixed(2)}</td>
                <td className={medicine.stock < 10 ? 'low-stock' : ''}>
                  {medicine.stock}
                </td>
                <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button 
                    onClick={() => handleEdit(medicine._id)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(medicine._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMedicines;
