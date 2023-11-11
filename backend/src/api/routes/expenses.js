import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/expenses", route);

    
    // GET ALL EXPENSES 
    //      or
    //  'id' as a query
    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { id } = req.query; 
            // Search by ID    
            if (id) res.json(await Database.getEntry('groups', { id: id }));
            // Return all
            else res.json(await Database.getTable("groups"));      
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve EXPENSE data", error: error });
        }
    });

    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const entryID = await Database
                .insertEntry(
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


    route.get("/group/:groupID", async (req, res) => {
        try {
            const groupID = req.params.groupID;
          
           const groupExpenses = await Database.getEntries(
                "expenses",
                { 'user_groups.group_id': groupID },
                [{ table: 'user_groups', on: 'expenses.user_id = user_groups.user_id' }]
            );
            res.json(groupExpenses)
        } catch (error) {
            res.status(500).json({ message: "Failure to get EXPENSE for GROUP", error: error });
        }
    });
    


}