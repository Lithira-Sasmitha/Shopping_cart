const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  signup,
  login,
  updateProfilePicture,
  getAllUsers,
  updateUser,
  updateUserRole,
  deleteUser,      // <-- import deleteUser here
} = require('../controllers/userController');

// Multer config for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// -----------------
// Public routes
// -----------------
router.post('/signup', signup);
router.post('/login', login);
router.put('/profile-picture/:id', upload.single('profilePicture'), updateProfilePicture);

// -----------------
// Admin routes (should be protected by middleware in real app)
// -----------------
router.get('/', getAllUsers);               // Get all users
router.put('/:id', updateUser);             // Update user details
router.put('/:id/role', updateUserRole);    // Update user role
router.delete('/:id', deleteUser);          // <-- Add this DELETE route here

module.exports = router;
