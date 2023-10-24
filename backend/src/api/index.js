import { Router as RouterExpress } from "express";
import Test from "./routes/test/index.js"
import Database from "./routes/database/index.js";

// guaranteed to get dependencies
export default () => {
  const app = RouterExpress();
  Test(app);
  Database(app);
  // shop(app);
  return app;
};