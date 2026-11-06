const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');

const app = express();

app.use(cors());              // allows the React app (port 5173) to call this API
app.use(express.json());      // reads JSON request bodies
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Vehicle Rental System API is running' });
});

app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
