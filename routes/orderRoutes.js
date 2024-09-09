const express = require('express');
const { placeOrderController, approveRejectOrderController } = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Place an order (accessible to users and organizations)
router.post('/place',authMiddleware,roleMiddleware(['user', 'organisation']),placeOrderController);

// Approve or Reject an order (accessible to admins)
router.post('/update-status', authMiddleware, roleMiddleware(['admin']),approveRejectOrderController);

module.exports = router;