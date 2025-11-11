# MediShop - Online Medicine Shopping Website

A complete full-stack e-commerce application for online medicine shopping with separate admin and user functionalities.

## 🌟 Features

### User Features
- **User Registration & Login**: Secure authentication with JWT tokens
- **Browse Medicines**: View medicines with categories, search, and filters
- **Medicine Details**: Detailed information about each medicine including price, stock, expiry date, dosage, and side effects
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Secure checkout with shipping address and payment information
- **Order Tracking**: View order history and track order status
- **User Profile**: Manage personal information and address

### Admin Features
- **Admin Dashboard**: Overview of orders, medicines, revenue, and pending orders
- **Medicine Management**: Add, edit, and delete medicines
- **Inventory Management**: Track stock levels with automatic updates after orders
- **Order Management**: View all orders and update order status
- **User Management**: View customer details

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Well-structured API endpoints
- **Responsive Design**: Mobile-friendly user interface
- **Stock Management**: Automatic stock updates after order placement
- **Payment Integration**: Support for Credit Card, Debit Card, and Cash on Delivery
- **Category System**: Medicine categorization for easy browsing
- **Search Functionality**: Search medicines by name, company, or description

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd learn2
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/medicine-shop
# - JWT_SECRET=your_secret_key
# - JWT_EXPIRE=7d
# - NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# On macOS/Linux
sudo systemctl start mongodb

# On Windows
net start MongoDB
```

The application will automatically create the required collections on first run.

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

## 📁 Project Structure

```
learn2/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── medicineController.js # Medicine CRUD operations
│   │   ├── cartController.js     # Shopping cart logic
│   │   └── orderController.js    # Order management
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Medicine.js           # Medicine schema
│   │   ├── Cart.js               # Cart schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── medicines.js          # Medicine routes
│   │   ├── cart.js               # Cart routes
│   │   └── orders.js             # Order routes
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/            # Admin components
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminMedicines.js
│   │   │   │   ├── AdminOrders.js
│   │   │   │   ├── MedicineForm.js
│   │   │   │   └── Admin.css
│   │   │   ├── Auth/             # Authentication components
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   ├── Cart/             # Cart components
│   │   │   │   ├── Cart.js
│   │   │   │   ├── Checkout.js
│   │   │   │   ├── Cart.css
│   │   │   │   └── Checkout.css
│   │   │   ├── Layout/           # Layout components
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Header.css
│   │   │   │   └── Footer.css
│   │   │   ├── Medicine/         # Medicine components
│   │   │   │   ├── MedicineList.js
│   │   │   │   ├── MedicineCard.js
│   │   │   │   ├── MedicineDetail.js
│   │   │   │   └── Medicine.css
│   │   │   └── Order/            # Order components
│   │   │       ├── OrderList.js
│   │   │       ├── OrderDetail.js
│   │   │       └── Order.css
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js           # Home page
│   │   │   └── Home.css
│   │   ├── services/
│   │   │   └── api.js            # API service functions
│   │   ├── App.js                # Main app component
│   │   ├── App.css               # App styles
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   └── package.json              # Frontend dependencies
│
├── .gitignore                    # Git ignore file
└── README.md                     # Project documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/updatedetails` - Update user details (Protected)

### Medicines
- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get single medicine
- `POST /api/medicines` - Create medicine (Admin)
- `PUT /api/medicines/:id` - Update medicine (Admin)
- `DELETE /api/medicines/:id` - Delete medicine (Admin)
- `GET /api/medicines/categories` - Get categories

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 👤 Default User Credentials

### Creating Admin User

To create an admin user, register normally and then update the user role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or create directly:
```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "admin",
  createdAt: new Date()
})
```

## 🎯 Usage Guide

### For Users
1. Register a new account
2. Browse medicines by category or search
3. View medicine details
4. Add items to cart
5. Proceed to checkout
6. Enter shipping and payment information
7. Place order
8. Track order status

### For Admins
1. Login with admin credentials
2. Access admin dashboard
3. Manage medicines (Add/Edit/Delete)
4. View and manage all orders
5. Update order status
6. Monitor stock levels

## 🌐 Medicine Categories

- Pain Relief
- Antibiotics
- Vitamins & Supplements
- Cold & Flu
- Digestive Health
- Heart Health
- Diabetes Care
- First Aid
- Skin Care
- Others

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Role-based access control
- CORS protection
- Helmet security headers
- Input validation
- MongoDB injection prevention

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Known Issues & Limitations

- Payment integration is simulated (not connected to real payment gateway)
- Image upload not implemented (uses placeholder images)
- Email notifications not implemented
- Real-time order tracking not available

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
sudo systemctl status mongodb

# Check MongoDB URI in .env file
MONGODB_URI=mongodb://localhost:27017/medicine-shop
```

### Port Already in Use
```bash
# Change PORT in backend/.env
PORT=5001
```

### CORS Errors
Make sure the frontend API URL matches the backend URL in `frontend/src/services/api.js`

## 📝 Future Enhancements

- Real payment gateway integration (Stripe, PayPal)
- Email notifications for orders
- SMS notifications
- Image upload for medicines
- Medicine reviews and ratings
- Wishlist feature
- Prescription upload
- Real-time chat support
- Advanced analytics dashboard
- Multi-language support
- PWA support

## 🤝 Contributing

This is an educational project. Contributions are welcome for learning purposes.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a learning project for building full-stack e-commerce applications.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Note**: This is a demo application for educational purposes. For production use, additional security measures, testing, and features should be implemented.