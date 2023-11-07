const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Import the SQLite module
const cors = require('cors');

const port = 3000; // Change this to your desired port
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const databaseName = 'postdb.sqlite'; // SQLite database file name
const tableName = 'userlist';
const groupTable = 'groups';

// Create a new SQLite database and open a connection
const db = new sqlite3.Database(databaseName, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create the userlist table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Error creating the table:', err);
    } else {
      console.log('Table created successfully');
    }
  }
);

db.run(
    `CREATE TABLE IF NOT EXISTS ${groupTable} (
      userId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (userId) REFERENCES ${tableName}(id)
      
    )`,
    (err) => {
      if (err) {
        console.error('Error creating the userGroup table:', err);
      } else {
        console.log('User-Group association table created successfully');
      }
    }
  );


// GET Request to retrieve user list
app.get('/api/users', (req, res) => {
  const getUsersQuery = 'SELECT * FROM userlist';

  db.all(getUsersQuery, (err, rows) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(rows); // Send the user data as JSON
    }
  });
});

// Close the SQLite database connection when your application exits
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing SQLite database:', err);
    } else {
      console.log('SQLite database connection closed');
    }
    process.exit(0);
  });











  // ////////////////////////////
//to show users in the console ...
// ///////////////////////////////////////////////////
// //do not remove this
// //to get all the user
// // db.serialize(() => {
// //           db.run(
// //             `CREATE TABLE IF NOT EXISTS ${tableName} (
// //               id INTEGER PRIMARY KEY AUTOINCREMENT,
// //               username TEXT,
// //               password TEXT
// //             )`,
// //             (err) => {
// //               if (err) {
// //                 console.error('Error creating the table:', err);
// //                // res.status(500).send('Internal Server Error');
// //               } else {
// //                 console.log('Table created successfully');
// //                // res.status(200).send('Table created successfully');
// //               }
// //             }
// //           );
// //         });
    
// //     const getUsersQuery = 'SELECT * FROM userlist';

// //     db.all(getUsersQuery, (err, rows) => {
// //         if (err) {
// //         console.error('Error retrieving users:', err);
// //         } else {
// //         console.log('All users:');
// //         rows.forEach((row) => {
// //             console.log(`Username: ${row.username}, Password: ${row.password}`);
// //         });
// //         }
// //     });
// ///////////////////////////////////

/////////////////////
// // do not remove
// // to add users manually
// //   const username = 'CollegeCorey';
// //   const password = 'corey';
// //   const insertUserQuery = db.prepare('INSERT INTO userlist (username, password) VALUES (?, ?)');

// //   insertUserQuery.run(username, password, (err) => {
// //     if (err) {
// //       console.error('Error inserting user:', err);
// //     } else {
// //       console.log('User added successfully');
// //     }
// //     insertUserQuery.finalize(() => {
// //       // Close the SQLite database connection
// //       db.close((err) => {
// //         if (err) {
// //           console.error('Error closing SQLite database:', err);
// //         } else {
// //           console.log('SQLite database connection closed');
// //         }
// //       });
// //     });
// //   });
// //////////////////////
});

// Start your Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
