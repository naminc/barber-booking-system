const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const upload = require('../middlewares/upload');

router.get('/', staffController.getAll);
router.get('/stats', staffController.getStats);
router.get('/:id', staffController.getById);
router.post('/', upload.single('image'), staffController.create);
router.put('/:id', upload.single('image'), staffController.update);
router.delete('/:id', staffController.delete);

module.exports = router;
