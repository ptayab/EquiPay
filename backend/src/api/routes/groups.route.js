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
            const groupList = await GroupDatabase.getGroupList();{joinedGroups.map((group, index) => (
    <li key={index} className="flex items-center p-4 rounded-lg shadow-md bg-white">
        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
            {group && group.name ? group.name : 'No Name Available'}
        </div>
        <div>
            <h2 className="text-lg font-semibold">
                {group && group.name ? group.name : 'No Name Available'}
            </h2>
            {/* You can include other information here if available */}
        </div>
    </li>
))}

            res.json({ data: groupList });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve group list", error: error.message });
        }
    });
};
