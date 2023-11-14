import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/users", route);

    // GET ALL USERS 
    //      or
    // User 'name' or 'id' as a query
    // Example: localhost:4000/api/users?id=3

    route.get("/", async (req, res) => {
        try {
            // Retrieve Query Details
            const { name, id, displayname } = req.query; 
            const response = await Database.getEntries(
                "users", 
                { 
                    name: name ? name : "*",
                    id: id ? id : "*",
                    displayname: displayname ? displayname : "*",
                }
            );
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve user data", error: error });
        }
    });

    // CREATE
    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create User and initialize, returns the entry ID
            const entryID = await Database.insertEntry("users", requestData);
            res.json({ message: "Success", id: entryID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create user", error: error });
        }
    });

    // UPDATE
    route.put("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.updateEntry("users", requestData);
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to update user", error: error });
        }
    });

    // DELETE
    route.delete("/", async (req, res) => { 
        try {
            // Parse Post Body
            const requestData = req.body;
            // Delete the attached entry, need to contain "id" to find the right one
            const response = await Database.removeEntry("users", requestData);
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to delete user", error: error });
        }
    });

    // GET USERS BY GROUP ID
    route.get("/group", async (req, res) => {
        try {
            // Retrieve the group ID from the query parameters
            const { group_id } = req.query;

            if (!group_id) {
                return res.status(400).json({ message: "Missing group_id in the query parameters" });
            }

            // Use the group_id to retrieve all users in that group
            const response = await Database.getEntries(
                "users",
                { "user_groups.group_id": group_id },
                [{ table: 'user_groups', on: 'users.id = user_groups.user_id' }]
            );

            res.json(response);

        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve users data", error: error });
        }
    });
};
