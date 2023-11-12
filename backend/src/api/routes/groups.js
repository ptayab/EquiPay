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
            const { name, id, user_id , group_id } = req.query; 
            
            // if "group_id" is passed as a query instead
            if(group_id) id = group_id;

            res.json(await Database.getEntries(
                "groups",
                id ? {
                    "id":id
                } : { 
                    "name": name ? name : "*",
                    "user_groups.user_id": user_id ? user_id : "*",
                },
                (!id && user_id)  ? [ { table: 'user_groups', on: 'groups.id = user_groups.group_id' } ] : [] 
            ))

        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve GROUP data", error: error });
        }
    })

    // POST TO CREATE NEW GROUP
    // Requires JSON Body, and at least a 'name' and 'user_id' field
    // Is going to need a name and an array of ID's that contain member ID's
    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const { name, members } = req.body;
            if( !name || !members) return res.status(500).json({ message: "Missing Needed Fields" });
            // Create Group and initialize, returns the entry ID
            const group_id = await Database.insertEntry(
                    "groups",
                    { name: name } 
                );

            members.forEach(async member => {
                console.log(member, group_id)
                const linkID =  await Database.insertEntry(
                        "user_groups",
                        {
                            user_id: member,
                            group_id: group_id
                        }
                    )
                return linkID
            });

            res.json({ message: "Success", id: group_id });
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
    
    // Add user to existing group
    route.post("/user", async (req, res) => { 
        try {
            // Parse Post Body
            const { group_id, user_id } = req.body;
            if( !group_id || !user_id) return res.status(500).json({ message: "Missing Needed Fields" });
            // Create Group and initialize, returns the entry ID
            console.log(req.body)
            const linkID =  await Database.insertEntry(
                "user_groups",
                {
                    user_id: user_id,
                    group_id: group_id
                }
            )

            res.json({message: "Success", id: linkID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    })

    // Get all groups for a user ID
    route.get("/user", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { id:UserID } = req.query; 
            if( !UserID ) return res.status(500).json({ message: "Missing Needed Fields" });
            console.log("DEBUG","GET Groups/forUser",UserID)
            const response = await Database.getEntries(
                "groups",
                { "user_groups.user_id": UserID },
                [ { table: 'user_groups', on: 'groups.id = user_groups.group_id' } ]
            )

            res.json(response)
    
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve GROUP data", error: error });
        }
    })
  

}