const express = require('express')
const orderRouter = express.Router();
const {placeOrder,userOrders,verifyOrder, listOrders, updateState} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

orderRouter.post('/place' ,authMiddleware ,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/list',listOrders);
orderRouter.post('/userOrders',authMiddleware,userOrders);
orderRouter.post('/status', updateState)

module.exports = orderRouter;