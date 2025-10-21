const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { createUserSchema, deleteUserSchema, updateUserSchema } = require('../validations/userValidation');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, authorizeRoles('admin'), userController.getAll);
router.post('/create', verifyToken, authorizeRoles('admin'), validate(createUserSchema, 'body'), userController.create);
router.delete('/:id', verifyToken, authorizeRoles('admin'), validate(deleteUserSchema, 'params'), userController.delete);
router.get('/profile', verifyToken, userController.getProfile);
router.put('/:id', verifyToken, validate(updateUserSchema, 'body'), userController.update);


module.exports = router;