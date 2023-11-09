import express from 'express';
import sqlite from 'sqlite3';

const router = express.Router();
const db = new sqlite.Database('./equipay.db');

// Get all expenses
router.get('/', (req, res) => {
  db.all('SELECT * FROM expenses', (err, rows) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get expenses for a specific group
router.get('/group/:groupId', (req, res) => {
  const groupId = req.params.groupId;

  const query = `
    SELECT expenses.*
    FROM expenses
    JOIN user_groups ON expenses.user_id = user_groups.user_id
    WHERE user_groups.group_id = ?
  `;

  db.all(query, [groupId], (err, rows) => {
    if (err) {
      console.error(`Error fetching expenses for group ${groupId}:`, err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new expense
router.post('/', (req, res) => {
  const { totalamount, balance, amountowed, user_id, group_id, description } = req.body;

  const query = `
    INSERT INTO expenses (totalamount, balance, amountowed, user_id, group_id, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [totalamount, balance, amountowed, user_id, group_id, description], (err) => {
    if (err) {
      console.error('Error adding expense:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Expense added successfully' });
    }
  });
});

// Update an expense
router.put('/:expenseId', (req, res) => {
  const expenseId = req.params.expenseId;
  const { totalamount, balance, amountowed, user_id, group_id, description } = req.body;

  const query = `
    UPDATE expenses
    SET totalamount = ?, balance = ?, amountowed = ?, user_id = ?, group_id = ?, description = ?
    WHERE expenseid = ?
  `;

  db.run(query, [totalamount, balance, amountowed, user_id, group_id, description, expenseId], (err) => {
    if (err) {
      console.error(`Error updating expense ${expenseId}:`, err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: `Expense ${expenseId} updated successfully` });
    }
  });
});

// Delete an expense
router.delete('/:expenseId', (req, res) => {
  const expenseId = req.params.expenseId;

  const query = 'DELETE FROM expenses WHERE expenseid = ?';

  db.run(query, [expenseId], (err) => {
    if (err) {
      console.error(`Error deleting expense ${expenseId}:`, err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: `Expense ${expenseId} deleted successfully` });
    }
  });
});

export default router;
