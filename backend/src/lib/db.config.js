const DatabaseConfig = {
    tables: [
        {
            name: "users",
            sql: `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    displayname TEXT,
                    group_id INTEGER,
                    FOREIGN KEY (group_id) REFERENCES users(id)                 
                );
            `
        },
        {
            name: "groups",
            sql: `
                CREATE TABLE IF NOT EXISTS groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    user_id INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(id) 
                );
            `
        },
        {
            name: "user_groups",
            sql: `
                CREATE TABLE IF NOT EXISTS user_groups (
                    user_id INTEGER,
                    group_id INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (group_id) REFERENCES groups(groupid),
                    PRIMARY KEY (user_id, group_id)
                );
            `
        },
        {
            name: "expenses",
            sql: `
                CREATE TABLE IF NOT EXISTS expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    description TEXT,
                    totalamount REAL,
                    balance REAL,
                    amountowed REAL,
                    user_id INTEGER,
                    group_id INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (group_id) REFERENCES groups(groupid)
                );
            `
        },
        {
            name: "logs",
            sql: `
                CREATE TABLE IF NOT EXISTS logs (
                    log TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `
        }
    ],
	data: [
		{	
			table: 'users',
			entries: [
				{
					name : "bbob",
					displayname : "Builder Bob"
					
				} , {
					name : "rrandy",
					displayname : "Roommate Randy"
					
				} , {
					name : "dodale",
					displayname : "Dine Out Dale"
					
				} , {
					name : "sski",
					displayname : "Stezzy Ski"
				} , {
					name : "vvince",
					displayname : "Vacation Vince"
					
				} , {
					name : "ccory",
					displayname : "College Cory"     
				}
			]
		}

	]
	
};

export default DatabaseConfig;
