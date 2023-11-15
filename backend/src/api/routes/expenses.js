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

    route.delete("/", async (req, res) => { 
        try {
            const requestData = req.body;
        
            // Check if the request data contains an "id" field
            if (!requestData.id) {
                return res.status(400).json({ message: "Bad Request: Missing 'id' field in request data" });
            }
    
            // Delete the entry with the specified ID
            const response = await Database.deleteEntry("expenses", requestData);
            
            // Check if the delete was successful
            if (response) { res.json({ message: "Success" });
            } else {
                res.status(404).json({ message: "Not Found: Entry with specified ID not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failure to delete EXPENSE", error: error });
        }
    });
}