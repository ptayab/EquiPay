import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/groups", route);

    // GET ALL GROUPS 
    //      or
    // Group 'name' or 'id' as a query
    // localhost:4000/api/groups?id=3
    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { name, id } = req.query; 
            // Search by name
            if (name) res.json(await Database.getEntry("groups", { name: name }));
            // Search by ID    
            else if (id) res.json(await Database.getEntry('groups', { id: id }));
            // Return all
            else res.json(await Database.getTable("groups"));      
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve GROUP data", error: error });
        }
    })

    // POST TO CREATE NEW GROUP
    // Requires JSON Body, and at least a 'name' and 'user_id' field
    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const groupID = await Database.insertEntry(
                "groups",
                requestData 
            );
            // Creates the user_groups link using passed user ID and the 
            // returned ID of the group
            const user_groupsID = await Database.insertEntry(
                "user_groups",
                { 
                    user_id: requestData.user_id,
                    group_id: groupID
                } 
            );

            res.json({ id: groupID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    })

    route.put("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.updateEntry( "groups", requestData );
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    });

    /*
        Add a user to a group.
        Expecting: {
            user_id INTEGER,
            group_id INTEGER,
        }

    */

    route.post("/adduser", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const groupID = await Database.insertEntry(
                "user_groups",
                requestData 
            );

            res.json({ id: groupID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    })

}