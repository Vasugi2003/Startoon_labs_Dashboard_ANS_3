const User = require('../models/userModel');

module.exports.insertUser = async (req, res) => {
  const { name, password, email, gender } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ msg: 'User already exists' });
  }

  // Create new user
  const user = new User({
    name,
    password,
    email,
    gender,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({ msg: 'Invalid user data' });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send({ msg: 'No users found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error retrieving users' });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error retrieving user' });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error updating user' });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.send({ msg: 'User deleted' });
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error deleting user' });
  }
};
