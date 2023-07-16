const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { newCategory, getCategory, updateCategory } = require('../controllers/categoryController');

router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategory);
router.route('/admin/categories').get(isAuthenticatedUser, authorizeRoles('admin'), getCategory);
router.route('/admin/category/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory);


module.exports = router;