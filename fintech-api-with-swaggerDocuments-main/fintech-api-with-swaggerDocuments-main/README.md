# 💸 FinTech API

A simple Node.js-based FinTech API for user account management including deposit, withdraw, transfer, and viewing transactions. This project uses **Express** for the backend and **Swagger UI** for auto-generated API documentation.

## 🚀 Features

- Create users
- Check user balance
- Deposit funds
- Withdraw funds
- Transfer money between users
- View transaction history
- Swagger UI documentation at `/api-docs`

## 📁 Project Structure

```Fintech-api/
│
├── index.js # Main Express server file
├── swagger.js # Swagger configuration file
├── package.json # Project metadata and dependencies
└── README.md # You're reading this!
```

## 🛠️ Tech Stack

- Node.js
- Express.js
- UUID (for user IDs)
- Swagger (OpenAPI 3.0)
  
## 📦 Installation and Project Run Instructions 

```bash
git clone https://github.com/Katha-Sikdar/fintech-api-with-swaggerDocuments.git
cd fintech-api
npm install
```
## Run The Project -
```
node index.js
```
### Open your browser and navigate to:
```
http://localhost:3000/api-docs
```
📚 API Documentation
The API is documented using Swagger. Once the app is running:
```
Visit: http://localhost:3000/api-docs
Explore and test each endpoint via the Swagger UI.
```
📜 Example Endpoints
```
POST /users - Create a new user

GET /users/:id/balance - Get balance of a user

POST /users/:id/deposit - Deposit money to a user account

POST /users/:id/withdraw - Withdraw money from a user account

POST /transfer - Transfer money from one user to another

GET /users/:id/transactions - View transaction history of a user
```



