const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { productSchema } = require('../validation/productValidation');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', protect, restrictTo('Admin', 'Seller'), validate(productSchema), createProduct);
router.put('/:id', protect, restrictTo('Admin', 'Seller'), validate(productSchema), updateProduct);
router.delete('/:id', protect, restrictTo('Admin'), deleteProduct);

module.exports = router;
