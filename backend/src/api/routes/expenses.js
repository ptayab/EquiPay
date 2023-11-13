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
    // you can use any combination of the quiries to filter your request
    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from request
            const { id, user_id, group_id } = req.query; 
            res.json(await Database.getEntries(
                'expenses', 
                { 
                    id: id ? id : "*",
                    user_id: user_id ? user_id : "*",
                    group_id: group_id ? group_id : "*",   
                }
            ));

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
}