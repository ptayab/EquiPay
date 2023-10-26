import { Router } from "express";
import { UserDatabase } from "../../lib/database.js"

const route = Router();
export default (app) => {
    app.use("/users", route);

    route.get("/all", async (req, res) => {
        console.log("Hit the All api")
        const dataPromise = UserDatabase.getUserList();
        const data = await dataPromise
        res.json({data});
    });
};