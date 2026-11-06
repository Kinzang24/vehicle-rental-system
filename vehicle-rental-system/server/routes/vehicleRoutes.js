const express = require('express');
const router = express.Router();
const c = require('../controllers/vehicleController');

router.route('/').get(c.getVehicles).post(c.createVehicle);
router.route('/:id').get(c.getVehicleById).put(c.updateVehicle).delete(c.deleteVehicle);

module.exports = router;
