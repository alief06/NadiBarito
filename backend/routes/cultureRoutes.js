const express = require('express');
const router = express.Router();
const cultureController = require('../controllers/cultureController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', cultureController.getCulture);
router.post('/', protect, admin, cultureController.createCulture);
router.put('/:id', protect, admin, cultureController.updateCulture);
router.delete('/:id', protect, admin, cultureController.deleteCulture);

module.exports = router;
