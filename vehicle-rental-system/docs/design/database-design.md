# Database Design (MongoDB: VehicleRentalDB)

| Collection | Key fields |
|---|---|
| users | name, email, password, role |
| vehicles | name, brand, type, registrationNumber, pricePerDay, available |
| customers | name, email, phone, address, licenseNumber |
| rentals | customerId, vehicleId, startDate, endDate, totalAmount, status |
| returns | rentalId, returnDate, condition, lateFee, damageCharge |
| payments | rentalId, amount, method, paymentDate, status |

## Relationships
Customer 1-N Rental, Vehicle 1-N Rental, Rental 1-1 Return, Rental 1-N Payment.

## Navigation
Admin/Staff: Login > Dashboard > Vehicles | Customers | Rentals | Returns | Payments | Reports
Customer: Login > Dashboard > Available Vehicles | My Rentals | Payments | Profile
