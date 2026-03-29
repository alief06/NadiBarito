const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.post('/', itineraryController.createItinerary);
router.get('/:userId', itineraryController.getItineraryByUserId);

module.exports = router;
