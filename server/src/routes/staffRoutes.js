const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/', staffController.getAll);
router.post('/create', staffController.create);

module.exports = router;
