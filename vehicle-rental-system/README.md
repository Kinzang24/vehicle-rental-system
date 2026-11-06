# Vehicle Rental System (MERN)

A web application to manage vehicles and customers for a vehicle rental business.
Built sprint by sprint (Sprint 1 to Sprint 17) for the Advanced Application Development lab.

**Project No.:** 10 | **Domain:** Transportation | **Complexity:** Medium
**Planned modules:** Vehicles, Customers, Rentals, Returns, Payments
**Implemented in Sprints 1-17:** Vehicles and Customers (full CRUD, React + Express + MongoDB)

**Team Members:** (add names here)

## Tech Stack
MongoDB, Express.js, React (Vite), Node.js, Mongoose, Axios, React Router

## Setup

### 1. Backend
```
cd server
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
npm run dev
```
Server runs on http://localhost:5000. MongoDB must be running locally (or put your Atlas URI in `.env`).

### 2. Frontend
```
cd client
npm install
npm run dev
```
Open http://localhost:5173

## API Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/vehicles | Create vehicle |
| GET | /api/vehicles | List vehicles |
| GET | /api/vehicles/:id | Get one vehicle |
| PUT | /api/vehicles/:id | Update vehicle |
| DELETE | /api/vehicles/:id | Delete vehicle |
| POST/GET/PUT/DELETE | /api/customers, /api/customers/:id | Same CRUD for customers |

## Folder Structure
```
client/  React frontend (layouts, components, pages, routes, services, styles)
server/  Express backend (config, controllers, middleware, models, routes)
docs/    Planning and design documents
```

## Sprint Map
| Sprint | Where in the code |
|---|---|
| 1 | Workspace, Git, README |
| 2-3 | docs/ (planning and database design) |
| 4 | client/ and server/ scaffolding |
| 5 | client/src layouts, components, pages, styles |
| 6 | client/src/routes/AppRoutes.jsx, BrowserRouter in main.jsx |
| 7 | client/src/components/common (Button, Card, PageTitle) |
| 8 | client/src/styles/global.css (Flexbox, Grid, media queries) |
| 9-10 | State, props, events, controlled form and validation (ResourceManager.jsx, Login.jsx) |
| 11-12 | server/app.js, server.js, routes, controllers, middleware/requestLogger.js |
| 13 | server/config/database.js, .env |
| 14 | server/models/Vehicle.js, Customer.js |
| 15 | server/controllers (CRUD via utils/crudController.js) |
| 16 | client/src/services/vehicleService.js, pages/Vehicles |
| 17 | Customer module (model, controller, routes, service, page, navigation) |
