const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User'); 
const Order = require('./models/Order'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token, userId: user._id, username: user.name, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Endpoint to get user information
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);

    if (user) {
      res.status(200).json({ user, userId: user._id, username: user.name, email: user.email });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Endpoint to update user address
app.post('/api/user/address', async (req, res) => {
  const token = req.headers.authorization;
  const { address, city, postalCode } = req.body;

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);

    if (user) {
      user.address = address;
      user.city = city;
      user.postalCode = postalCode;
      await user.save();
      res.status(200).json({ message: 'Address updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Dashboard endpoint
app.get('/dashboard', (req, res) => {
  res.status(200).json({ message: 'Welcome to the dashboard!' });
});

// Save order endpoint
app.post('/api/save-order', async (req, res) => {
  const { userId, cart, shippingInfo, paymentInfo } = req.body;
  try {
    const newOrder = new Order({
      userId,
      cart,
      shippingInfo,
      paymentInfo,
      status: 'Pending',
      createdAt: new Date(),
    });
    await newOrder.save();
    res.status(200).send('Order saved successfully');
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send('Error saving order');
  }
});

// Fetch orders for the logged-in user
app.get('/api/orders', async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const orders = await Order.find({ userId: decoded.userId });

    if (orders) {
      res.status(200).json({ orders });
    } else {
      res.status(404).json({ message: 'No orders found' });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));