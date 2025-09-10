const express = require('express');
const { v4: uuidv4 } = require('uuid');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory user store
let users = {};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const userId = uuidv4();
  users[userId] = {
    id: userId,
    name,
    balance: 0,
    transactions: [],
  };

  res.status(201).json({ message: 'User created', userId });
});

/**
 * @swagger
 * /users/{id}/balance:
 *   get:
 *     summary: Get user balance
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Balance returned
 */
app.get('/users/:id/balance', (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ balance: user.balance });
});

/**
 * @swagger
 * /users/{id}/deposit:
 *   post:
 *     summary: Deposit money
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 */
app.post('/users/:id/deposit', (req, res) => {
  const { amount } = req.body;
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.balance += amount;
  user.transactions.push({ type: 'deposit', amount, date: new Date() });

  res.json({ message: 'Deposit successful', newBalance: user.balance });
});

/**
 * @swagger
 * /users/{id}/withdraw:
 *   post:
 *     summary: Withdraw money
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal successful
 */
app.post('/users/:id/withdraw', (req, res) => {
  const { amount } = req.body;
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.balance < amount)
    return res.status(400).json({ error: 'Insufficient balance' });

  user.balance -= amount;
  user.transactions.push({ type: 'withdraw', amount, date: new Date() });

  res.json({ message: 'Withdrawal successful', newBalance: user.balance });
});

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer money between users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               fromUserId:
 *                 type: string
 *               toUserId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful
 */
app.post('/transfer', (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  const sender = users[fromUserId];
  const receiver = users[toUserId];

  if (!sender || !receiver)
    return res.status(404).json({ error: 'Sender or Receiver not found' });

  if (sender.balance < amount)
    return res.status(400).json({ error: 'Insufficient funds' });

  sender.balance -= amount;
  receiver.balance += amount;

  sender.transactions.push({ type: 'transfer-out', to: toUserId, amount, date: new Date() });
  receiver.transactions.push({ type: 'transfer-in', from: fromUserId, amount, date: new Date() });

  res.json({ message: 'Transfer successful' });
});

/**
 * @swagger
 * /users/{id}/transactions:
 *   get:
 *     summary: Get transaction history
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction list
 */
app.get('/users/:id/transactions', (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ transactions: user.transactions });
});

// Swagger Docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FinTech API is running at http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});