import ResourceManager from '../../components/common/ResourceManager.jsx';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../services/customerService.js';

const service = { getAll: getCustomers, create: createCustomer, update: updateCustomer, remove: deleteCustomer };

const fields = [
  { name: 'name', label: 'Full name', required: true, minLength: 2, placeholder: 'Rahul Sharma' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'rahul@example.com' },
  { name: 'phone', label: 'Phone', required: true, minLength: 10, placeholder: '9876543210' },
  { name: 'licenseNumber', label: 'Driving license number', required: true, placeholder: 'AS0120230001234' },
  { name: 'address', label: 'Address', placeholder: 'Nagaon, Assam' }
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'licenseNumber', label: 'License' },
  { key: 'address', label: 'Address' }
];

function CustomersPage() {
  return <ResourceManager title="Customers" subtitle="Keep customer and driving license details in one place." singular="Customer" service={service} fields={fields} columns={columns} />;
}

export default CustomersPage;
