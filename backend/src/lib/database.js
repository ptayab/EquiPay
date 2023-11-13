import sqlite from 'better-sqlite3';
import fs from "fs";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DBConfig from "./db.config.js"

// Name of the actual file
const DataBase_Name = 'SQLiteDatabase.sqlite3';
const dbpath = path.join(dirname(dirname(fileURLToPath(import.meta.url))), "data", DataBase_Name );
// const dbpath = ":memory:" // Create Virtual DB in Ram

class DatabaseClass {
    constructor(dbpath) {
        if (!this.database && !fs.existsSync(dbpath)){
            console.log(`No existing Database... Creating New DB`)
            this.database = this.createTablesFromConfig(DBConfig, dbpath);
            this.initializeDefaultData(DBConfig)
        } else {
            this.database = sqlite(dbpath)
        }
        if(!this.database) console.error()
    }

    async createLog(message, obj){
        try {
            if (obj.hasOwnProperty('log')) return;
            const logEntry = `${message} - ${JSON.stringify(obj)}`
            this.insertEntry("logs", {log: logEntry})
        } catch (err) {
            console.error(`createLog: Unable to create log file.`,err);
        }
    }

    /**
     * Given a string that is the name of the table
     * this method will return the contents of the complete table
     * 
     * @param {string} table
     * @returns {object[]}
     */
    async getTable(table) {
        try {
            // Creates Query
            const sql = `SELECT * FROM ${table}` 
            // Runs SQL Query on the DB                           
            const entries = this.database.prepare(sql).all();
            return entries || []
        } catch (err) {
            console.log(`getTable Error: Unable to retrieve table ${table}.`);
            console.log( err );
            return []
        }
    }


    /**
     * given a string that is the name of a table
     * and an object containing the fields and values you request
     * this will return the last entry that fulfills those parameters.
     * Example:
     *    obj = { id: 1001 }  will return an object that whos "id" field contains "1001"
     *    obj = { name: groupname, owner: bob } will return the object whos corrasponding 
     *       value contain both that name AND owner
     * @param {string} table
     * @param {object} obj
     * @returns
     */
    async getEntry(table, obj) {
        try {
            const data = await this.getEntries(table, obj)
            return (Array.isArray(data)) ? data[data.length - 1]: data
        } catch (err) {
            console.error(`getEntry Error: Problem getting item from table "${table}".`);
            console.error(`Unable to retrieve match for this obj =>`, obj);
            console.error(err)
            return {}
        }
    }


    /**
     * given a string that is the name of a table 
     * and an object containing the fields and values you request
     * this will return all objects who have matching fields.
     * this will also be able to look up partials with wildcard
     * such as { name: "B*"} will return all entries who's name field starts with B
     * @param {string} table
     * @param {object} obj
     * @returns {object[]}
     */

    async getEntries(table, obj, joinConditions = [] ) {
        console.log("DEBUG_GetEntries:",table, obj, joinConditions)
        try {
            if(!table || !obj) console.error("GetEnties: Missing Parameters")
            
            // Map the keys and values
            const fields = Object.keys(obj);
            const values = Object.values(obj);
            // Changes the oparators pending on if there is a wild card or not
            const conditions = fields.map((field, index) => {
                if (typeof values[index] === 'string' && values[index].includes('*')) {
                    return `${field} LIKE ?`;
                } else {
                    // Use the table alias in the condition
                    return `${field.replace('user_groups.', '')} = ?`;
                }
            });

            // Create a new array with the values replaced (if needed)
            const sanitizedValues = values.map(value => {
                if (typeof value === 'string') return value.replace(/\*/g, '%');
                return value;
            });

            // Generate join conditions
            const joinClauses = joinConditions.map(condition => `JOIN ${condition.table} ON ${condition.on}`);

            // Create SQL Query with joins
            const sql = `SELECT * FROM ${table} ${joinClauses.join(' ')} WHERE ${conditions.join(' AND ')}`;
            // console.log("DEBUG_SQL", sql)
            // Run SQL Query on the DB  
            const entries = this.database.prepare(sql).all(...sanitizedValues);
            //Returns The Entry, or returns empty if not found
            return entries || []
        } catch (error) {
            console.error(`getEntries Error: Problem getting item from table "${table}".`);
            console.error(`Unable to retrieve match for this obj =>`, obj);
            console.error(err)
            return [];
        }
    }


    /**
     *
     * given a string that is the name of a table 
     * and an object containing the fields and values you wish to add
     * 
     * Every field needs to match the associated collumn in the database
     * appends a new entry and lets the DB generate an it.
     * 
     * @param {string} table
     * @param {object} obj
     * @returns {number} that contains the entries ID if successful and exists
     */
    async insertEntry(table, obj) {
        try {
            
            // Map the keys and values
            const columns = Object.keys(obj);
            const placeholders = columns.map(() => '?').join(',');
            const values = Object.values(obj);
           
            // Error Check to make sure there are valid Colums
            const validColumns = columns.filter(column => {
                const columnInfo = this.database.pragma(`table_info(${table})`)
                const columnInfoSorted = columnInfo.filter((info ) => info.name === column)[0];
                if(!columnInfoSorted) console.error(`insertEntry Note: The field "${column}" does not exist on the table ${table}`)
                return !!columnInfoSorted;
            });


            if (validColumns.length === 0)  throw new Error(`Invalid columns: ${columns.join(',')}`); 
            const fields = validColumns.join(',');

            // Create SQL Query
            const sql = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;
           
            // Run SQL Query on the DB  
            this.database.prepare(sql).run(...values);

            // Get The Just Created Object
            const generatedObj = await this.getEntry(table, obj)
            if (!generatedObj.id) return null;
            
            this.createLog(`New Entry Added to ${table}`, generatedObj )
            return generatedObj.id

        } catch (err) {
            console.log(`insertEntry: Problem with table "${table}". Unable to insert data:`)
            console.error(`Object -> ${JSON.stringify(obj)}`);
            console.error(err);
        }
    }

    /**
     * Given a string that is the name of a table 
     * and an object containing the fields and values of the item you wish to remove
     * The obj MUST CONTAIN AN "ID" as it uses this to choose the right one
     * @param {string} table
     * @param {object} obj
     * @returns {void}
     */

    async removeEntry(table, obj) {
        try {
            // Parse the fields and values needed to locate the item
            const conditions = Object.keys(obj).map((key) => `${key} = ?`).join(' AND ');
            const values = Object.values(obj);
    
            // Run SQL Query on the DB
            const sql = `DELETE FROM ${table} WHERE ${conditions}`;

            // Run SQL Query on the DB
            this.database.prepare(sql).run(...values);
            return true;
        } catch (err) {
            console.log(`removeEntry: Table "${table}" issue.`);
            console.error(`Unable to remove entry with condition: ${JSON.stringify(obj)}`)
            console.error(err);
            return false;
        }
    }

    /**
     * Given a string that is the name of a table 
     * and an object containing the fields and values of the item you wish to update
     * THE OBJ DATA MUST CONTAIN AN ID, Otherwise it's only best guess
     * but it will replace all supplied fields of an entry with the obj's values
     * 
     * @param {string} table
     * @param {object} obj
     * @returns {boolean} True on success
     */
    async updateEntry(table, obj) {
        try {
            
            // Error if there is an issue
            if (!obj.hasOwnProperty('id')) {
                console.log(`updateEntry: Table "${table}" issue. Unable to update entry: ${JSON.stringify(obj)}`);
                return false;
            }

            // Extract the ID from the object
            const id = obj.id;
            
            // Parse Columns
            const columns = Object.keys(obj);
            const validColumns = columns.filter(column => {
                const columnInfo = this.database.pragma(`table_info(${table})`);
                const columnInfoSorted = columnInfo.filter((info) => info.name === column)[0];
                return !!columnInfoSorted;
            });
            
            if (validColumns.length !== columns.length) {
                throw new Error(`Invalid columns: ${columns.join(', ')}`);
            }
    
            // Construct the SET part of the SQL query
            const setClause = validColumns.map(column => `${column} = ?`).join(',');
    
            // Prepare and run the update query
            const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
            console.log("DEBUG:",sql)
            this.database.prepare(sql).run(...Object.values(obj), id);

            this.createLog(`Entry updated in ${table}`, obj);
            return true;
        } catch (error) {
            console.log(`updateEntry: Table "${table}" issue. Unable to update entry: ${JSON.stringify(obj)}`);
            console.error(err);
            return false;
        }
    }
    

    /**
     * Given a string that is the name of a table 
     * and an object containing the fields and values of the item you wish to check
     * returns a boolean if a duplicate is found
     * @param {string} table
     * @param {object} obj
     * @returns {boolean}
    */
    async checkForDuplicate(table, obj){
        try {
            obj.hasOwnProperty('id') ? delete obj[fieldToRemove] : obj
            const dups = await this.getEntries(table,obj);
            return dups.length !== 0;
        } catch (err) {
            console.log(`checkForDuplicate: Table "${table}" issue. Unable to get data: ${JSON.stringify(obj)}`);
            console.error(err);
        }
    }


    /**
     * Given a JSON file will create all table contained in a "tables object"
     * then 
     * @param {JSON} DBConfig
     * @param {string} dbPath the path of the database
     * @returns {sqlite.database}
    */
    createTablesFromConfig(DBConfig, dbPath) {
        try {
            const db = new sqlite(dbPath);
            db.exec('PRAGMA foreign_keys = ON;', (err) => { if (err) console.error('Error enabling foreign key support:', err)});
            for (const table of DBConfig.tables) db.exec(table.sql);
            this.report(db)
            return db;
        } catch (err) {
            console.log(`createTablesFromConfig: Unable to initialize tables ${JSON.stringify()}`);
            console.error(err);
        }
    }
    
    /**
     * Initializes all the data from the config gile
     * db.config.json
     * @param {JSON} DBConfig 
     */
    initializeDefaultData(DBConfig){
        // Iterate over non-table field in the config and write it to the DB
        for (const dataSet of DBConfig.data) {
            for (const entry of dataSet.entries) this.insertEntry(dataSet.table, entry)  
        }
        // this.report()
    }


    /**
     * Initializes all the table from the config file
     * db.config.json
     * @param {JSON} database 
     */
    report(database) {
        console.log("-- Database Schema Report --")
        const db = !database ? this.database : database;
        const tablesSQL = "SELECT name FROM sqlite_master WHERE type='table'"
        const tables = db.prepare(tablesSQL).all();

        for (const table of tables) {
            console.log(`Table: ${table.name}`);
            const sql = `PRAGMA table_info(${table.name})`
            const columns = db.prepare(sql).all();
            for (const column of columns) {
                console.log(`  Column: ${column.name} (Type: ${column.type})`);
            }
        }
    }

    /**
     *  Example:
     *  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)' 
     *  const params = ['John Doe', 30];
     * 
     *  Database.execute(sql, params, (error, result) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Result:', result);
            }
        })
     *  @param {string} sql 
     *  @param {string[]} params 
     *  @param {*} callback 
     */
    execute(sql, params = [], callback) {
        try {
            if (params.length > 0) {
                // If params are provided, use a parameterized query
                const statement = this.db.prepare(sql);
                const result = statement.run(...params);
                callback(null, result);
            } else {
                // If no params, use exec for simple queries
                const result = this.db.exec(sql);
                callback(null, result);
            }
        } catch (error) {
            callback(error, null);
        }
    }
}

const Database = new DatabaseClass(dbpath);
export default Database;

