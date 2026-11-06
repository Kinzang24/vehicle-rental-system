const Vehicle = require('../models/Vehicle');
const crud = require('../utils/crudController')(Vehicle, 'Vehicle');

exports.createVehicle = crud.create;
exports.getVehicles = crud.getAll;
exports.getVehicleById = crud.getOne;
exports.updateVehicle = crud.update;
exports.deleteVehicle = crud.remove;
