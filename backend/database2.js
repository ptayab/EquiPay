import sqlite from 'sqlite3';

const db = new sqlite.Database('./equipay.db');

// Enable foreign key support
db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) console.error('Error enabling foreign key support:', err);
});

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    displayname TEXT,
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES users(id) 
)`;

db.run(usersTable, (err) => {
    if (err) console.error('Error creating user table:', err);
});

const groupsTable = `
CREATE TABLE IF NOT EXISTS groups (
    groupid INTEGER PRIMARY KEY,
    groupname TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) 
)`;

db.run(groupsTable, (err) => {
    if (err) console.error('Error creating group table:', err);
});

const userGroupsTable = `
CREATE TABLE IF NOT EXISTS user_groups (
    user_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(groupid),
    PRIMARY KEY (user_id, group_id)
)`;

db.run(userGroupsTable, (err) => {
    if (err) console.error('Error creating user_groups table:', err);
});

const expensesTable = `
CREATE TABLE IF NOT EXISTS expenses (
    expenseid INTEGER PRIMARY KEY,
    totalamount REAL,
    balance REAL,
    amountowed REAL,
    user_id INTEGER,
    group_id INTEGER,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(groupid)
)`;


db.run(expensesTable, (err) => {
    if (err) console.error('Error creating expenses table:', err);
});

// manually add the users
const insertUsersQuery = `
INSERT INTO users (name, displayname) VALUES
('bbob', 'Builder Bob'),
('rrandy', 'Roommate Randy'),
('dodale', 'Dine Out Dale'),
('sski', 'Stezzy Ski'),
('vvince', 'Vacation Vince'),
('ccory', 'College Cory')
`;

db.run(insertUsersQuery, (err) => {
    if (err) {
        console.error('Error inserting users:', err);
    } else {
        console.log('Users inserted successfully');
    }
});

