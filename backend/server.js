// const express = require('express');
// const {connectdb} = require('./config/db');
// const userController = require('./controllers/userController');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectdb()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.post('/api/users', userController.insertUser);
// app.get('/api/users', userController.getAllUsers);
// app.get('/api/users/:id', userController.getUser);
// app.put('/api/users/:id', userController.updateUser);
// app.delete('/api/users/:id', userController.deleteUser);

// const port = 9000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel'); // Ensure this path is correct

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DashboardSL')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Signup route
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const user = new User({ name, email, password, gender, count: 0, lastLoginDate: new Date() });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      user.count += 1; // Increment login count
      user.lastLoginDate = new Date(); // Update last login date
      await user.save();
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/api/users', async (req, res) => {
    console.log('GET /api/users requested');
    try {
      const users = await User.find({});
      console.log('Users found:', users);
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
    }
  });
  

app.listen(port, () => console.log(`Server running on port ${port}`));
