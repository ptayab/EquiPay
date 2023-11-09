import express from 'express';
import sqlite from 'sqlite3';

const router = express.Router();
const db = new sqlite.Database('./equipay.db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM groups', (err, rows) => {
    if (err) {
      console.error('Error fetching groups:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

router.post('/addgroup', (req, res) => {
  const { groupname } = req.body;

  const { userId } = 1;

  db.run('INSERT INTO groups (groupname, user_id) VALUES (?, ?)', groupname, userId, function (err) {
    if (err) {
      console.error('Error adding group:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const groupId = this.lastID;

    // Insert the association into the user_groups table
    db.run('INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)', userId, groupId, (err) => {
      if (err) {
        console.error('Error adding user-group association:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    });
  });
});


export default router;
