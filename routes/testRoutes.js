const express = require('express');
const testController  = require('../controllers/test.Controller');

//router object
const router = express.Router(); 

//routes
router.get('/', testController );

//exports
module.exports =  router ;
