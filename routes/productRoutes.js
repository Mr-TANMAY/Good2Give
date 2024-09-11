const express = require('express');
const {addProductController, getProductsController, getUserProductsController} = require ('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const router = express.Router();

//Add product (only for hotels and stores)
router.post('/add',authMiddleware,roleMiddleware(['hotel', 'stores']), addProductController)


//Get available products (accessible to user and organisation)
router.get('/list', authMiddleware, roleMiddleware(['user', 'organisation']),getProductsController)


// Get products added by the current user
router.get('/user-products/:userId', authMiddleware, getUserProductsController);

module.exports = router;


