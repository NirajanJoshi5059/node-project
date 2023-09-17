const express = require('express');
const router= express.Router();
const orderController = require('../controllers/orderController');
const checkUser = require('../middleware/authCheck');



router.get('/api/order/all', checkUser.adminCheck, orderController.getAllOrder);
router.get('/api/order/user',checkUser.userCheck, orderController.getOrderByUser);
router.post('/api/create-order',checkUser.userCheck, orderController.addOrder);

module.exports = router;