import { Router } from "express";
import * as Database from "../../../lib/database.js"

const route = Router();

export default (app) => {
  app.use("/db", route);

  route.get("/test", async (req, res) => {
        await Database.TestDatabase()
        res.json({Message: "Doing Stuff With The Database"});
  });
};