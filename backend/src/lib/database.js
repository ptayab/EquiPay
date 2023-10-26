import fs from "fs";
import path from 'path';
import sqlite from 'better-sqlite3';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import DBtables from './db.config.json' assert { type: 'json' };

const DataBase_Name = 'SQLiteDatabase.sqlite3'

const dbpath = path.join(dirname(dirname(fileURLToPath(import.meta.url))), "data", DataBase_Name );

class DatabaseClass {
    constructor(dbpath) {
        this.path = dbpath;
        if (!fs.existsSync(dbpath)){
            console.log(`Seems you have lost your database from ${dbpath}.`)
            console.log(`Building new one just for you. Don't loose this one too.`)
            console.log(dbpath)
            this.createTablesFromJSON(DBtables);
           
        }
    }

    connect(){
        try {
            const database = sqlite(this.path)
            return database 
        } catch (err) {
            console.error(`DATABASE ERROR: unable to connect to ${path}`,err);
        }
    } 

    /**
     * 
     * @param {string} table 
     * @returns 
     */
    async getTable(table) {
        try { 
            const db = this.connect()   
            if(!db){ return } // Return Null if there's no connection
            const sql = `SELECT * FROM ${table}`
            const entries = db.prepare(sql).all();
            db.close();
            return entries
        } catch (err) {
            console.log(`getTable: Unable to retrieve table ${table}.`,err);
        } 
    }


    /** 
     * 
     * @param {string} table  
     * @param {object} obj 
     * @returns 
     */
    async getEntry(table, obj) {
        try {
            const db = this.connect();
            if(!db){ return } 
            
            const fields = Object.keys(obj);
            const values = Object.values(obj);
            const sql = `SELECT * FROM ${table} WHERE ${fields.map(f => `${f} = ?`).join(" AND ")}`;
            const entry = db.prepare(sql).get(...values); // Use spread operator to pass values as separate arguments
            db.close();
            return entry || false; 
        } catch (err) {
            console.error(`getEntry: Table "${table}" issue. Unable to retrieve match for this obj =>`, obj, err);
            return false;
        } 
    }


    /**
     * 
     * @param {string} table 
     * @param {object} obj 
     * @returns 
     */

    async getEntries(table, obj ) {
        try {
            const db = this.connect();
            if(!db){ return } // Return Null if there's no connection

            const fields = Object.keys(obj);
            const values = Object.values(obj);
            const sql = `SELECT * FROM ${table} WHERE ${fields.map(f => `${f} = ?`).join(" AND ")}`;
            const entries = db.prepare(sql).all(values);
            db.close();
            return entries ? entries : false;
        } catch (error) {
            console.log(`getEntries: Table "${table}" issue. Unable to retrieve matching entries for this obj =>`, obj, error);
            return [];
        } 
    }

    
    /**
     * 
     * @param {string} table 
     * @param {object} obj 
     * @returns {void}
     */
    async insertEntry(table, obj) {
        try {
            const db = this.connect();
            if(!db){ return } // Return Null if there's no connection
            
            const columns = Object.keys(obj);
            const placeholders = columns.map(() => '?').join(',');
            const values = Object.values(obj);
          
            const validColumns = columns.filter(column => {
                const columnInfo = db.pragma(`table_info(${table})`)
                const columnInfoSorted = columnInfo.filter((info ) => info.name === column)[0];
                return !!columnInfoSorted; 
            });
            
            if (validColumns.length === 0) { throw new Error(`Invalid columns: ${columns.join(',')}`) }
          
            const fields = validColumns.join(',');
            const preparedQuery = db.prepare(`INSERT INTO ${table} (${fields}) VALUES (${placeholders})`);
            preparedQuery.run(...values);

            db.close();
        } catch (err) {
            console.log(`insertEntry: Table "${table}" issue. Unable to insert data: ${JSON.stringify(obj)}`, err);
        } 
    }
    

    /**
     * 
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
            console.log(`checkForDuplicate: Table "${table}" issue. Unable to get data: ${JSON.stringify(obj)}`, err);
        } 
    }

    createTablesFromJSON(jsonData) {
        const db = new sqlite(this.path);
      
        for (const table of jsonData.tables) {
            const tableName = table.name;
            const columns = table.columns.map(column => {
                const columnName = column.name;
                const columnType = column.type;
                const columnAttributes = column.attributes ? column.attributes.join(' ') : '';
                return `${columnName} ${columnType} ${columnAttributes}`;
            });
      
            const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
            db.exec(createTableSQL);
        }
        db.close();
        for (const user of jsonData.users) { this.insertEntry('users', user) }
  
    }
}

class UserDBClass extends DatabaseClass {
 
    async getUserList(){
        try {
            const dataPromise = super.getTable("users");
            const data = await dataPromise;
            return data;
        } catch (error) {
            console.log(`getUserList: Table "User" issue. Unable to gather data: ${JSON.stringify(obj)}`, err);
        }
    }
  
}


export const Database = new DatabaseClass(dbpath);
export const UserDatabase = new UserDBClass(dbpath);


export default Database;
Database.checkForDuplicate("users", { name:"rrandy"}).then(info => { console.log(`Checking For Duplicates:`,info ) })


