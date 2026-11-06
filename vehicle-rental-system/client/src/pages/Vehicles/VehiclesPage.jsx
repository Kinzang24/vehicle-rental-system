import ResourceManager from '../../components/common/ResourceManager.jsx';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../services/vehicleService.js';

const service = { getAll: getVehicles, create: createVehicle, update: updateVehicle, remove: deleteVehicle };

const fields = [
  { name: 'name', label: 'Vehicle name', required: true, minLength: 2, placeholder: 'Innova' },
  { name: 'brand', label: 'Brand', required: true, placeholder: 'Toyota' },
  { name: 'type', label: 'Type', type: 'select', options: ['Car', 'Bike', 'Bus', 'Van'], required: true },
  { name: 'registrationNumber', label: 'Registration number', required: true, placeholder: 'AS01AB1234' },
  { name: 'pricePerDay', label: 'Price per day (Rs.)', type: 'number', required: true, min: 1 },
  { name: 'available', label: 'Available for rent', type: 'checkbox', default: true }
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'brand', label: 'Brand' },
  { key: 'type', label: 'Type' },
  { key: 'registrationNumber', label: 'Registration' },
  { key: 'pricePerDay', label: 'Price/Day', render: (v) => `Rs. ${v.pricePerDay}` },
  { key: 'available', label: 'Status', render: (v) => <span className={`badge ${v.available ? 'badge-ok' : 'badge-no'}`}>{v.available ? 'Available' : 'Rented'}</span> }
];

function VehiclesPage() {
  return <ResourceManager title="Vehicles" subtitle="Add, edit and track every vehicle in the fleet." singular="Vehicle" service={service} fields={fields} columns={columns} />;
}

export default VehiclesPage;
