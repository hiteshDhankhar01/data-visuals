const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

router.get('/all-customers', customersController.getAllCustomer );
router.get('/total-customers', customersController.getTotalCustomer );
router.get('/new-customers', customersController.getNewCustomersOverTime);
// router.get('/repeat-customers', customersController.getRepeatCustomers);
router.get('/zx', customersController.getRepeatCustomers);
router.get('/geographical-distribution', customersController.getGeographicalDistribution);
router.get('/lifetime-value', customersController.getCustomerLifetimeValueByCohorts);

module.exports = router;