const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { deleteUserSchema } = require('../validations/userValidation');

router.get('/', userController.getAll);
router.post('/create', userController.create);
router.delete('/:id', validate(deleteUserSchema, 'params'), userController.delete);

module.exports = router;