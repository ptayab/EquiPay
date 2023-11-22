const DatabaseConfig = {
    tables: [
        {
            name: "users",
            sql: `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    displayname TEXT
                );
            `
        },
        {
            name: "groups",
            sql: `
                CREATE TABLE IF NOT EXISTS groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    
                );
            `
        },
        {
            name: "user_groups",
            sql: `
                CREATE TABLE IF NOT EXISTS user_groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    group_id INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (group_id) REFERENCES groups(id)
                );
            `
        },
        {
            name: "expenses",
            sql: `
                CREATE TABLE IF NOT EXISTS expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    notes TEXT,
                    total REAL,
                    balance REAL,
                    user_id INTEGER,
                    group_id INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (group_id) REFERENCES groups(id)
                );
            `
        },
        {
            name: "comments",
            sql: `
                CREATE TABLE IF NOT EXISTS comments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    comment TEXT,
                    expense_id INTEGER,
                    user_id INTEGER,
                    group_id INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (group_id) REFERENCES groups(id),
                    FOREIGN KEY (expense_id) REFERENCES expenses(id)
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
                    // email : "bobthebuilder@gmail.com"
					
				} , {
					name : "rrandy",
					displayname : "Roommate Randy"
                    // email : "roommaterandy@gmail.com"
					
				} , {
					name : "dodale",
					displayname : "Dine Out Dale"
                    // email : "dineoutdale@gmail.com"
					
				} , {
					name : "sski",
					displayname : "Stezzy Ski"
                    // email : "stezzyski@gmail.com"
				} , {
					name : "vvince",
					displayname : "Vacation Vince"
                    // email : "vacationvince@gmail.com"
					
				} , {
					name : "ccory",
					displayname : "College Cory"  
                    // email : "collegecory@gmail.com"
				}
			]
		}

	]
	
};

export default DatabaseConfig;
