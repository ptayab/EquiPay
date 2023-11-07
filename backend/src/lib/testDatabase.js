import { Database, UserDatabase, GroupDatabase } from './database.js'; // Import the instances of your databases

// Example: Creating a new entry in the 'users' table
// const userEntry = { name: 'Alice', displayname: 'Abboo' };
// UserDatabase.insertEntry('users', userEntry);

// console.log('User Entry:', userEntry);

// Example: Checking for duplicates in the 'users' table
const isDuplicate = await UserDatabase.checkForDuplicate('users', { name: 'Alice' });
console.log('Is Duplicate:', isDuplicate);

// Example: Retrieving a list of users from the 'users' table
const userList = await UserDatabase.getUserList();
console.log('User List:', userList);

// const groupTableInformation = {
//     tables: [
//         {
//             name: 'groups',
//             columns: [
//                 { name: 'id', type: 'INTEGER', attributes: ['PRIMARY KEY'] },
//                 { name: 'name', type: 'TEXT', attributes: ['NOT NULL'] },
//             ],
//         },
//     ],
//     users: [], // If you don't need to insert any users, you can keep it as an empty array.
// };

const groupEntry = { name: 'TestGroup' };
GroupDatabase.insertEntry('groups', groupEntry);

console.log('Group Table:', GroupDatabase.getGroupList());
console.log('Group Entry:', GroupDatabase.getTable('groups'));



// console.log(UserDatabase.)
// You can call other methods in a similar way