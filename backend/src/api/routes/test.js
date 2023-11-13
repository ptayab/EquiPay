
/*
    There is one route file for every route. That for every /api/*
    When one is made a the file has to be imported into the router file.
    This just make sure that it can be found.
*/

import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();

export default (app) => {
    app.use("/test", route);

    // GET TEST
    // This just responds if you send a get request to it.
    route.get("/", async (req, res) => {
            res.json({Message: "You have made a sucessfull GET request"});
    });

    // BOUNCE BACK ROUTES
    // Theses will just send back whatever to send it. Ideal for checking if your function works
    route.post("/", async (req, res) => {
        const response =  {
            message: "You have made a sucessful POST request",
            ...req.body
        }
        res.json(response);
    });
};


