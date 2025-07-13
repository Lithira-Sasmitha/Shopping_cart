const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Signup new user
const signup = async (req, res) => {
  const { name, email, phone, address, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Upload or update profile picture
const updateProfilePicture = async (req, res) => {
  const userId = req.params.id;

  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: req.file.filename },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({
      message: 'Profile picture updated',
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.error('Update profile picture error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ===== Admin Functions =====

// Get all users (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password field for security
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Update user details (name, phone, address, email)
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, address, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, address, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // ✅ Updated: Allow "inventory" role
    const validRoles = ['user', 'admin', 'inventory'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error updating role' });
  }
};


// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

module.exports = {
  signup,
  login,
  updateProfilePicture,
  getAllUsers,
  updateUser,
  updateUserRole,
  deleteUser,
};
