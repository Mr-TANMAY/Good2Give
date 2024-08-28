const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//routes
//register user || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//get current user || GET (with token)
router.get('/currentUser',authMiddleware, currentUserController)

module.exports = router;

