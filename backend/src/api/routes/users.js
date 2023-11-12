import { Router } from "express";
import Database from "../../lib/database.js"

const route = Router();
export default (app) => {
    app.use("/users", route);

    // GET ALL USERS 
    //      or
    // User 'name' or 'id' as a query
    // Example: localhost:4000/api/users?id=3

    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { name, id } = req.query; 
            // Search by name
            if (name) res.json(await Database.getEntry("users", { name: name }));
            // Search by ID    
            else if (id) res.json(await Database.getEntry('users', { id: id }));
            // Return all
            else res.json(await Database.getTable("users"));      
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve user Data" });
        }
    })

    // CREATE
    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const entryID = await Database.insertEntry("users",requestData);
            res.json({ id: entryID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    })

    // UPDATE
    route.put("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.updateEntry( "users", requestData );
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to update USER", error: error });
        }
    });

    route.delete("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.removeEntry( "users", requestData );
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to delete USER", error: error });
        }
    });
    
};
 
