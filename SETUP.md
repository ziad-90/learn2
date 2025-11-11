# Quick Setup Guide

This guide will help you set up and run the MediShop application quickly.

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js (v14 or higher) installed
- [ ] MongoDB (v4.4 or higher) installed and running
- [ ] npm or yarn package manager
- [ ] Git (for cloning the repository)
- [ ] A code editor (VS Code, WebStorm, etc.)

## Quick Start (5 Minutes)

### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd learn2
```

### Step 2: Backend Setup (2 minutes)
```bash
# Navigate to backend
cd backend

# Install dependencies (this may take 1-2 minutes)
npm install

# Create and configure .env file
cp .env.example .env

# Edit .env if needed (default values work for local development)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/medicine-shop
# JWT_SECRET=medishop_secret_key_2024_change_in_production
# JWT_EXPIRE=7d
# NODE_ENV=development
```

### Step 3: Frontend Setup (2 minutes)
```bash
# Open a new terminal, navigate to frontend
cd frontend

# Install dependencies (this may take 2-3 minutes)
npm install
```

### Step 4: Start MongoDB (1 minute)

**On macOS/Linux:**
```bash
sudo systemctl start mongodb
# OR
mongod
```

**On Windows:**
```bash
net start MongoDB
```

**Verify MongoDB is running:**
```bash
# This should connect without errors
mongosh
# or
mongo
```

### Step 5: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
Browser should automatically open at http://localhost:3000

## Default Configuration

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017/medicine-shop
- **Database Name**: medicine-shop

## Creating an Admin User

1. **Register a normal user** through the web interface
2. **Connect to MongoDB** and update the user role:

```bash
# Connect to MongoDB
mongosh

# or for older versions
mongo

# Switch to the medicine-shop database
use medicine-shop

# Find your user
db.users.find({ email: "your-email@example.com" })

# Update user role to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

# Verify the change
db.users.find({ email: "your-email@example.com" })
```

3. **Logout and login again** to see admin features

## Testing the Application

### As a User:
1. Navigate to http://localhost:3000
2. Click "Register" and create an account
3. Browse medicines
4. Add items to cart
5. Proceed to checkout
6. View your orders

### As an Admin:
1. Create admin user (see above)
2. Login with admin credentials
3. Access Admin Dashboard
4. Add new medicines
5. View and manage orders
6. Update order statuses

## Adding Sample Medicine Data

You can add sample medicines through the admin interface or directly through MongoDB:

```javascript
// Connect to MongoDB
use medicine-shop

// Insert sample medicines
db.medicines.insertMany([
  {
    name: "Aspirin",
    company: "Bayer",
    category: "Pain Relief",
    description: "Pain relief and fever reducer",
    price: 9.99,
    stock: 100,
    expiryDate: new Date("2025-12-31"),
    prescription: false,
    dosage: "500mg tablets",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Amoxicillin",
    company: "GSK",
    category: "Antibiotics",
    description: "Antibiotic for bacterial infections",
    price: 24.99,
    stock: 50,
    expiryDate: new Date("2025-06-30"),
    prescription: true,
    dosage: "250mg capsules",
    sideEffects: "May cause nausea or diarrhea",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vitamin C",
    company: "Nature Made",
    category: "Vitamins & Supplements",
    description: "Immune system support",
    price: 14.99,
    stock: 200,
    expiryDate: new Date("2026-12-31"),
    prescription: false,
    dosage: "1000mg tablets",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

## Troubleshooting

### Port Already in Use
```bash
# Backend
# Change PORT in backend/.env to 5001 or another available port

# Frontend
# Set PORT environment variable
PORT=3001 npm start
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Or start it
sudo systemctl start mongodb

# Check connection string in backend/.env
MONGODB_URI=mongodb://localhost:27017/medicine-shop
```

### CORS Errors
Make sure the API URL in `frontend/src/services/api.js` matches your backend URL:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Frontend Shows Blank Page
1. Check browser console for errors (F12)
2. Verify backend is running
3. Check API URL in frontend code
4. Clear browser cache and reload

## Environment Variables Reference

### Backend (.env)
```bash
# Server Configuration
PORT=5000                    # Backend server port
NODE_ENV=development         # Environment (development/production)

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/medicine-shop

# JWT Configuration
JWT_SECRET=your_secret_key   # Change in production!
JWT_EXPIRE=7d               # Token expiration time
```

### Frontend
No environment variables needed for local development. The API URL is configured in `src/services/api.js`.

## Next Steps

1. **Explore the Application**: Test all features
2. **Read the README**: Full documentation in README.md
3. **Check Security**: Review SECURITY.md for security practices
4. **Customize**: Modify styling, add features
5. **Deploy**: Follow deployment guides for production

## Common Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
npm test         # Run tests (not implemented yet)
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Getting Help

- Check the full README.md for detailed documentation
- Review SECURITY.md for security information
- Open an issue in the repository for bugs
- Check the code comments for implementation details

## Performance Tips

- Use MongoDB indexes for better query performance
- Implement Redis for rate limiting in production
- Use environment-specific configurations
- Enable production mode for better performance
- Use PM2 or similar for process management

---

**Setup Time**: ~5-10 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Educational project
