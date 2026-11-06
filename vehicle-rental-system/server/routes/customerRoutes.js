const express = require('express');
const router = express.Router();
const c = require('../controllers/customerController');

router.route('/').get(c.getCustomers).post(c.createCustomer);
router.route('/:id').get(c.getCustomerById).put(c.updateCustomer).delete(c.deleteCustomer);

module.exports = router;
