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
} = require('../controllers/userController');

// Multer config (image upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.put('/profile-picture/:id', upload.single('profilePicture'), updateProfilePicture);

// Admin routes (protect these in real app with middleware)
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.put('/:id/role', updateUserRole);

module.exports = router;
