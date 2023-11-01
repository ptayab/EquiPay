import { Router } from "express";
import { GroupDatabase } from "../../lib/database.js"

const route = Router();
export default (app) => {


    app.use("/groups", route);

    route.post("/addgroup", async (req, res) => {
        try {
            // Get the group name from the request body
            const { groupName } = req.body;
    
            // Add your group creation logic here using groupName
            // Example:
            GroupDatabase.insertEntry('groups', { name: groupName });
            console.log("groupDatafrom Router", { groupName });
    
            // Send a response indicating success and include the new group if needed
            res.status(201).json({ message: "Group created successfully", newGroup: { groupName } });
        } catch (error) {
            // Handle any errors that may occur during group creation
            res.status(500).json({ message: "Group creation failed", error: error.message });
        }
    });
    
    

    route.get("/", async (req, res) => {
        res.json({Message: "You have made a sucessfull GET request"});
    });

    // GET request to retrieve all groups
    route.get("/all", async (req, res) => {
        try {
            const groupList = await GroupDatabase.getGroupList();
            res.json({ data: groupList });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve group list", error: error.message });
        }
    });
};
