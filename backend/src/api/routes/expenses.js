import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/expenses", route);
    /*
        description TEXT,
        totalamount REAL,
        balance REAL,
        user_id INTEGER,
        group_id INTEGER,
    */


    // GET ALL EXPENSES 
    //      or
    //  'id' as a query
    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { id } = req.query; 
            // Search by ID    
            if (id) res.json(await Database.getEntry('expenses', { id: id }));
            // Return all
            else res.json(await Database.getTable("expenses"));      
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve EXPENSE data", error: error });
        }
    });

    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const entryID = await Database.insertEntry(
                    "expenses",
                    requestData 
                );
            res.json({ id: entryID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create Expense", error: error });
        }
    });

    route.put("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.updateEntry( "expenses", requestData );
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to update EXPENSE", error: error });
        }
    });

    // Get all expenses in a group
    route.get("/group/:GroupID", async (req, res) => {
        try {
            const  GroupID  = req.params.GroupID;
            if( !GroupID ) return res.status(500).json({ message: `Missing Needed Fields "GroupID" ` });
            const { id:UserID } = req.query; 
          
            // If no user is declared, return entire group otherwise filter with user ID
            const groupExpenses = await Database.getEntries(
                "expenses",
                { 
                    'group_id': GroupID,
                    'user_id': UserID ? UserID : "*"
                }
            );
            res.json(groupExpenses)
            

        } catch (error) {
            res.status(500).json({ message: "Failure to get EXPENSE for GROUP", error: error });
        }
    });

    route.get("/group/user", async (req, res) => {
        try {
            const { id:UserID } = req.query; 
          
            const groupExpenses = await Database.getEntries(
                "expenses",
                { 'group_id': UserID }
            );
            res.json(groupExpenses)
        } catch (error) {
            res.status(500).json({ message: "Failure to get EXPENSE for GROUP", error: error });
        }
    });
    


}