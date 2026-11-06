const Customer = require('../models/Customer');
const crud = require('../utils/crudController')(Customer, 'Customer');

exports.createCustomer = crud.create;
exports.getCustomers = crud.getAll;
exports.getCustomerById = crud.getOne;
exports.updateCustomer = crud.update;
exports.deleteCustomer = crud.remove;
