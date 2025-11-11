import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const user = JSON.parse(userInfo);
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};

// Medicine API
export const getMedicines = async (category = '', search = '') => {
  const response = await axios.get(`${API_URL}/medicines`, {
    params: { category, search },
  });
  return response.data;
};

export const getMedicine = async (id) => {
  const response = await axios.get(`${API_URL}/medicines/${id}`);
  return response.data;
};

export const createMedicine = async (medicineData) => {
  const response = await axios.post(`${API_URL}/medicines`, medicineData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateMedicine = async (id, medicineData) => {
  const response = await axios.put(`${API_URL}/medicines/${id}`, medicineData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await axios.delete(`${API_URL}/medicines/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/medicines/categories`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const addToCart = async (medicineId, quantity) => {
  const response = await axios.post(
    `${API_URL}/cart`,
    { medicineId, quantity },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await axios.put(
    `${API_URL}/cart/${itemId}`,
    { quantity },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(`${API_URL}/cart`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Order API
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/myorders`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getOrder = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateOrderToPaid = async (id, paymentResult) => {
  const response = await axios.put(
    `${API_URL}/orders/${id}/pay`,
    paymentResult,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(
    `${API_URL}/orders/${id}/status`,
    { status },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
