// import { Database } from '.\equipay\backend\src\lib\database.js'; // Update the path to the actual location of your database.js file

// // Example usage:
// async function testDatabase() {
//   // Insert an entry into the 'users' table
//   const newUser = { name: 'John', email: 'john@example.com' };
//   Database.insertEntry('users', newUser);

//   // Retrieve the list of users
//   const userList = await Database.getTable('users');
//   console.log('User List:', userList);

//   // Check for duplicates
//   const isDuplicate = await Database.checkForDuplicate('users', { name: 'John' });
//   console.log('Is Duplicate:', isDuplicate);
// }

// testDatabase();


const express = require('express');
const app = express();
const port = 3000;

// Add middleware and route setup here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

