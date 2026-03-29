const express = require('express');
const router = express.Router();
const culinaryController = require('../controllers/culinaryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', culinaryController.getCulinary);
router.post('/', protect, admin, culinaryController.createCulinary);
router.get('/:id', culinaryController.getCulinaryById);
router.put('/:id', protect, admin, culinaryController.updateCulinary);
router.delete('/:id', protect, admin, culinaryController.deleteCulinary);

module.exports = router;
