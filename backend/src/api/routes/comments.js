import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/comments", route);

    // GET ALL comments 
    //      or
    // Comments parent 'group_id' or 'user_id' as a query
    // localhost:4000/api/groups?id=3
    route.get("/", async (req, res) => {
        try {
            // Retrive Query Details from 
            const { id, user_id , group_id, expense_id } = req.query; 
            res.json(await Database.getEntries(
                "comments",
                id ? {
                    "id":id
                } : { 
                    "group_id": group_id ? group_id : "*",
                    ...(user_id ? { "users.id": user_id } : {}),
                },
                (!id && user_id) ? [ { table: 'users', on: 'comments.user_id = users.id' } ] : [] 
            ))
                
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve GROUP data", error: error });
        }
    })

    // POST TO CREATE NEW Comment
    route.post("/", async (req, res) => { 
        try {
            // Parse Post Body
            const { group_id, user_id, comment  } = req.body;
            if( !group_id || !user_id || !comment) return res.status(500).json({ message: "Missing Needed Fields" });

            // // Assuming the user creating the group is the owner (you may need to get the user_id from the authentication token)
            // const owner_id = req.user.id;
            // Create Group and initialize, returns the entry ID
            const comment_id = await Database.insertEntry(
                    "comments",
                    { 
                      ...req.body           
                    } 
                );
            console.log("Group created with ID:", comment_id);
            res.json({ message: "Success", id: comment_id });
        } catch (error) {
            res.status(500).json({ message: "Failure to create GROUP", error: error });
        }
    })

}