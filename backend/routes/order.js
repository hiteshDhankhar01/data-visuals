const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/all', ordersController.getAllOrders);
router.get('/by-date', ordersController.getOrdersByDateRange);
router.get('/by-customer', ordersController.getOrdersByCustomerEmail);
router.get('/total-sales', ordersController.getTotalSales);
router.get('/sales-data', ordersController.getSalesData);
router.get('/revenue', ordersController.getTotalRevenue);
router.get('/repeat-customers', ordersController.getCustomerRepeatPurchases);


module.exports = router;
