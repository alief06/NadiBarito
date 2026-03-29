const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, reviewController.createReview);
router.get('/:placeId', reviewController.getReviewsByPlaceId);
router.get('/user/:userId', protect, reviewController.getReviewsByUserId);

// Admin routes
router.get('/admin/all', protect, admin, reviewController.getAllReviews);
router.delete('/admin/:id', protect, admin, reviewController.deleteReview);

module.exports = router;
