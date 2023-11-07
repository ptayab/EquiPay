import { Router } from "express";
import { UserDatabase } from "../../lib/database.js"

const route = Router();
export default (app) => {
    app.use("/user", route);

    route.get("/", async (req, res) => {
        try {
            const { name, id } = req.query;
            if (name) {         // Search by name
                const userData = await UserDatabase.getUserByName(name);
                res.json({ message: "Success", data: userData });
            } else if (id) {     // Search by ID
                const userData = await UserDatabase.getUserById(id);
                res.json({ message: "Success", data: userData });
            } else {            // Return all
                const userData = await UserDatabase.getUserList();
                res.json({ message: "Success", data: userData });
            }
        } catch (error) {
            res.status(500).json({ message: "Failure" });
        }
    });
};



/*





app.get('/all/:param1/:param2', async (req, res) => {
  // Access parameters from the request using req.params
  const param1 = req.params.param1;
  const param2 = req.params.param2;

  console.log('Hit the All API with param1:', param1, 'and param2:', param2);

  // You can use the parameters in your logic
  const data = UserDatabase.getUserList(param1, param2);

  res.json({ data });
});

// Your UserDatabase and other middleware setup goes here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


*/