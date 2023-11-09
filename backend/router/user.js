import express from 'express';
import sqlite from 'sqlite3';

const router = express.Router();
const db = new sqlite.Database('./equipay.db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

export default router;
