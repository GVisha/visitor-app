# Decoupled Full-Stack Visitor Registration Application

A modern, decoupled web application prototype modelled after enterprise visitor management workflows. This application functions as a service-oriented architecture with a strictly isolated frontend client and backend REST API server communicating over local network protocols.

## 🛠️ Technical Stack

- **Frontend:** React.js, TypeScript (`.tsx`), functional component architecture, state hooks (`useState`, `useEffect`), and Vite build utility.
- **Backend API:** Node.js, Express framework, typed route controllers (`@types/express`), and asynchronous event loops.
- **Database:** PostgreSQL relational engine running local schema configurations and parameterised SQL injection protection.

## 📂 Architecture Layout

```text
visitor-app/
├── backend/          # Node.js + Express + TypeScript API server
└── frontend/         # React + TypeScript user interface (Vite)
```

## 🚀 Local Installation & Setup

### Prerequisite Database Configuration
1. Initialise a local PostgreSQL instance running on port `5432`.
2. Connect using a database controller client and create an application database:
   ```sql
   CREATE DATABASE vms_db;
   ```
3. Establish the core relational schema contract:
   ```sql
   CREATE TABLE visitors (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       purpose VARCHAR(50) NOT NULL,
       checked_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 1. Backend Engine Activation
Navigate into the backend service directory, rinstall dependencies, and run the server:
```bash
cd backend
npm install
npm run dev
```
*Note: The backend service listens on port `5001` to prevent system conflicts with default macOS AirPlay bindings.*

For a production-style run:

```bash
npm run build
npm start
```

### 2. Frontend Client Activation
Navigate into the frontend directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` inside your browser to view the application.
