// import mySql from "mysql2"

const databaseName = "EquiPay";
const tableName = "userList";

// const connection = mySql.createConnection({
//     host: 'localhost',
//     user: "root",
//     port: 3306,
//     password: "6393847717",
// });

// export async function TestDatabase(){
//     try {
//         connection.connect((err) => {
//             if (err) {
//                 console.log("Failed to connect to database: ", err);
//             }
//             console.log("Connection to database successful ");
//         });
//         // connection.query(`DROP DATABASE IF EXISTS postdb`, function(err, result){
//         // 	if(err){
//         // 		console.log(err);
//         // 	}
//         // 	console.log("databse dropped!");
//         // });
    
//         const createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
//         connection.query(createQuery, (err) => {
//             if (err) {
//                 console.log("Failed", err);
//             }
//             console.log("Database created successfully");
//         });
    
//         connection.query(`USE ${databaseName}`, function (err, result) {
//             if (err) {
//                 console.log(err);
//             }
//         });
    
//         const createUserTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
//             id INT UNSIGNED NOT NULL auto_increment,
//             username VARCHAR(100) UNIQUE NOT NULL,
//             password VARCHAR(100) NOT NULL,
//             PRIMARY KEY (id)
//         )`;
    
//         connection.query(createUserTable, (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("User table created successfully");
//                 insertTestUsers(); // Call the function to insert test users here
//             }
//         });
    
//         app.get('/users', (req, res) => {
//             connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
//                 if (err) {
//                     console.log("Error querying users:", err);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }
    
//                 res.json(rows); // Send user data as JSON
//             });
//         });
        
//         function insertTestUsers() {
//             const users = [
//                 { username: 'Aryan', password: 'Arora' },
//                 { username: 'BobTheBuilder', password: 'Bob' },
//             ];
        
//             users.forEach((user) => {
//                 const checkUserQuery = 'SELECT * FROM userlist WHERE username = ?';
//                 connection.query(checkUserQuery, [user.username], (err, results) => {
//                     if (err) {
//                         console.log('Error checking user:', err);
//                     } else if (results.length === 0) {
//                         // User doesn't exist, insert them
//                         const insertUserQuery = 'INSERT INTO userlist (username, password) VALUES (?, ?)';
//                         connection.query(insertUserQuery, [user.username, user.password], (err, result) => {
//                             if (err) {
//                                 console.log('Error inserting user:', err);
//                             } else {
//                                 console.log(`User ${user.username} inserted successfully`);
//                             }
//                         });
//                     } else {
//                         console.log(`User ${user.username} already exists. Skipping insertion.`);
//                     }
//                 });
//             }
//             )}
//     } catch (error) {
//         console.log('Issue with database', error)
//     }
   
// }