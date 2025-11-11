import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MedicineList from './components/Medicine/MedicineList';
import MedicineDetail from './components/Medicine/MedicineDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import OrderList from './components/Order/OrderList';
import OrderDetail from './components/Order/OrderDetail';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminMedicines from './components/Admin/AdminMedicines';
import MedicineForm from './components/Admin/MedicineForm';
import AdminOrders from './components/Admin/AdminOrders';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/medicines" element={<MedicineList />} />
              <Route path="/medicines/:id" element={<MedicineDetail />} />
              
              {/* Protected User Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/medicines"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminMedicines />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/medicines/new"
                element={
                  <ProtectedRoute adminOnly>
                    <MedicineForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/medicines/edit/:id"
                element={
                  <ProtectedRoute adminOnly>
                    <MedicineForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
