const express = require('express');
const { placeOrderController, approveRejectOrderController } = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();
const Order = require('../models/orderModel');

// Place an order (accessible to users and organizations)
router.post('/place',authMiddleware,roleMiddleware(['user', 'organisation']),placeOrderController);

// Approve or Reject an order (accessible to admins)
router.post('/update-status', authMiddleware, roleMiddleware(['admin']),approveRejectOrderController);

// Fetch all orders (for admin)
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        // Fetch all orders and populate buyer's name and product details
        const orders = await Order.find().populate('product').populate('buyer', 'name');
        
        res.status(200).send({
            success: true,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching orders',
            error,
        });
    }
});
module.exports = router;