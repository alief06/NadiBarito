const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/favorites/:userId', protect, userController.getFavorites);
router.post('/favorites/toggle', protect, userController.toggleFavorite);

// Admin routes
router.get('/', protect, admin, userController.getAllUsers);
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
