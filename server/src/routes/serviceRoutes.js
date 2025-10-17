const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);
router.post('/create', serviceController.create);

module.exports = router;