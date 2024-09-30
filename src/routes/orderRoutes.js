const express = require('express');
const { createOrder, getSellerOrders, getAllOrders, getSellerSales } = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { orderSchema } = require('../validation/orderValidation');

const router = express.Router();

router.post('/', protect, restrictTo('Customer'), validate(orderSchema), createOrder);
router.get('/seller', protect, restrictTo('Seller'), getSellerOrders);
router.get('/', protect, restrictTo('Admin'), getAllOrders);
router.get('/sales/seller', protect, restrictTo('Seller'), getSellerSales);

module.exports = router;