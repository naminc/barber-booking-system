const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { deleteUserSchema } = require('../validations/userValidation');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/', userController.getAll);
router.post('/create', userController.create);
router.delete('/:id', validate(deleteUserSchema, 'params'), authorizeRoles('admin'), userController.delete);
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;