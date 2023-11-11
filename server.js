// //to show users in the console ...
// // ///////////////////////////////////////////////////
// // //do not remove this
// // //to get all the user
// // // db.serialize(() => {
// // //           db.run(
// // //             `CREATE TABLE IF NOT EXISTS ${tablegroupName} (
// // //               id INTEGER PRIMARY KEY AUTOINCREMENT,
// // //               usergroupName TEXT,
// // //               password TEXT
// // //             )`,
// // //             (err) => {
// // //               if (err) {
// // //                 console.error('Error creating the table:', err);
// // //                // res.status(500).send('Internal Server Error');
// // //               } else {
// // //                 console.log('Table created successfully');
// // //                // res.status(200).send('Table created successfully');
// // //               }
// // //             }
// // //           );
// // //         });
    
// // //     const getUsersQuery = 'SELECT * FROM userlist';

// // //     db.all(getUsersQuery, (err, rows) => {
// // //         if (err) {
// // //         console.error('Error retrieving users:', err);
// // //         } else {
// // //         console.log('All users:');
// // //         rows.forEach((row) => {
// // //             console.log(`UsergroupName: ${row.usergroupName}, Password: ${row.password}`);
// // //         });
// // //         }
// // //     });
// // ///////////////////////////////////

// /////////////////////
// // // do not remove
// // // to add users manually
// // //   const usergroupName = 'CollegeCorey';
// // //   const password = 'corey';
// // //   const insertUserQuery = db.prepare('INSERT INTO userlist (usergroupName, password) VALUES (?, ?)');

// // //   insertUserQuery.run(usergroupName, password, (err) => {
// // //     if (err) {
// // //       console.error('Error inserting user:', err);
// // //     } else {
// // //       console.log('User added successfully');
// // //     }
// // //     insertUserQuery.finalize(() => {
// // //       // Close the SQLite database connection
// // //       db.close((err) => {
// // //         if (err) {
// // //           console.error('Error closing SQLite database:', err);
// // //         } else {
// // //           console.log('SQLite database connection closed');
// // //         }
// // //       });
// // //     });
// // //   });
// // //////////////////////
// });



const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const databaseName = 'postdb.sqlite';
const tableName = 'userlist';
const groupTable = 'groups';

const db = new sqlite3.Database(databaseName, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Error creating the users table:', err);
    } else {
      console.log('Users table created successfully');
    }
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS ${groupTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupName TEXT
    )`,
    (err) => {
      if (err) {
        console.error('Error creating the groups table:', err);
      } else {
        console.log('Groups table created successfully');
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS userGroup (
      userId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (userId) REFERENCES ${tableName}(id),
      FOREIGN KEY (groupId) REFERENCES ${groupTable}(id)
    )`,
    (err) => {
      if (err) {
        console.error('Error creating the userGroup table:', err);
      } else {
        console.log('User-Group association table created successfully');
      }
    }
  );
});

// Get users
app.get('/api/users', (req, res) => {
  const getUsersQuery = `SELECT id, username FROM ${tableName}`;

  db.all(getUsersQuery, (err, rows) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Get groups
app.get('/api/groups', (req, res) => {
    const query = `SELECT id, groupName FROM ${groupTable}`;
    
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error fetching groups:', err);
        res.status(500).json({ error: 'Error fetching groups' });
      } else {
        res.status(200).json({ data: rows });
      }
    });
});

// Create group
app.post('/api/groups', (req, res) => {
  const { groupName, members } = req.body;

  db.run(
    `INSERT INTO ${groupTable} (groupName) VALUES (?)`,
    [groupName],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating the group' });
      }

      const groupId = this.lastID;

      members.forEach((userId) => {
        db.run(
          'INSERT INTO userGroup (userId, groupId) VALUES (?, ?)',
          [userId, groupId]
        );
      });

      return res.status(200).json({ message: 'Group created successfully' });
    }
  );
});

// Get groups for a user
app.get('/api/getGroups/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = `SELECT ${groupTable}.id, ${groupTable}.groupName FROM ${groupTable}
      INNER JOIN userGroup ON ${groupTable}.id = userGroup.groupId
      WHERE userGroup.userId = ?`;
  
    db.all(query, [userId], (err, rows) => {
      if (err) {
        console.error('Error fetching user groups:', err);
        res.status(500).json({ error: 'Error fetching user groups' });
      } else {
        console.log('User groups fetched successfully:', rows);
        res.status(200).json({ data: rows });
      }
    });
});


app.get('/api/groups/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const query = `SELECT ${tableName}.id, ${tableName}.username FROM ${tableName}
      INNER JOIN userGroup ON ${tableName}.id = userGroup.userId
      WHERE userGroup.groupId = ?`;
  
    db.all(query, [groupId], (err, rows) => {
      if (err) {
        console.error('Error fetching users in group:', err);
        res.status(500).json({ error: 'Error fetching users in group' });
      } else {
        console.log('Users in group fetched successfully:', rows);
        res.status(200).json({ data: rows});
      }
    });
  });


  app.get('/api/groupName/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const groupNameQuery = 'SELECT groupName FROM groups WHERE id = ?';
  db.get(groupNameQuery, [groupId], (err, row) => {
 
    if (err) {
        console.log("Error:", err);
        res.status(500).json({ error: 'Error fetching group name' });
    } else {
        const groupName = row ? row.groupName : null;
        console.log('Group Name:', groupName);

        // Now you can use groupName as needed, for example, send it in the response
        res.status(200).json({ groupName });
    }
});
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
