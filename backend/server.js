const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql2');
const path = require('path').join(__dirname, 'frontend', 'build');
const cors = require('cors');

const port = 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path));
app.use(cors());

const databaseName = "EquiPay";
const tableName = "userList";

const connection = mySql.createConnection({
    host: 'localhost',
    user: "root",
    port: 3306,
    password: "6393847717",
});

app.get('/', (req, res) => {
    connection.connect((err) => {
        if (err) {
            console.error("Failed to connect to database: ", err);
        }
        console.log("Connection to database successful ");
    });
    // connection.query(`DROP DATABASE IF EXISTS postdb`, function(err, result){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log("databse dropped!");
	// });

    const createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    connection.query(createQuery, (err) => {
        if (err) {
            console.error("Failed", err);
        }
        console.log("Database created successfully");
    });

    connection.query(`USE ${databaseName}`, function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    const createUserTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT UNSIGNED NOT NULL auto_increment,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    )`;

    connection.query(createUserTable, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("User table created successfully");
            insertTestUsers(); // Call the function to insert test users here
        }
    });

    app.get('/users', (req, res) => {
        connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
            if (err) {
                console.error("Error querying users:", err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json(rows); // Send user data as JSON
        });
    });
    
    function insertTestUsers() {
        const users = [
            { username: 'Aryan', password: 'Arora' },
            { username: 'BobTheBuilder', password: 'Bob' },
        ];
    
        users.forEach((user) => {
            const checkUserQuery = 'SELECT * FROM userlist WHERE username = ?';
            connection.query(checkUserQuery, [user.username], (err, results) => {
                if (err) {
                    console.error('Error checking user:', err);
                } else if (results.length === 0) {
                    // User doesn't exist, insert them
                    const insertUserQuery = 'INSERT INTO userlist (username, password) VALUES (?, ?)';
                    connection.query(insertUserQuery, [user.username, user.password], (err, result) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                        } else {
                            console.log(`User ${user.username} inserted successfully`);
                        }
                    });
                } else {
                    console.log(`User ${user.username} already exists. Skipping insertion.`);
                }
            });
        }
        )}
});

console.log('Server up and running at port ' + port);
app.listen(port);
