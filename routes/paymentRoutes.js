const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRazorpayOrderController } = require('../controllers/orderController');
const router = express.Router();



router.post('/create-razorpay-order', authMiddleware, createRazorpayOrderController);

module.exports = router;
