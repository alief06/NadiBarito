const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', placeController.getPlaces);
router.post('/', protect, admin, placeController.createPlace);
router.get('/:id', placeController.getPlaceById);
router.put('/:id', protect, admin, placeController.updatePlace);
router.delete('/:id', protect, admin, placeController.deletePlace);

module.exports = router;
