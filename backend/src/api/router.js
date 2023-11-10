import { Router as RouterExpress } from "express";
import Test from "./routes/test.js"
import Users from "./routes/users.js"
import Groups from "./routes/groups.js"
import Expenses from "./routes/expenses.js"

// guaranteed to get dependencies
export default () => {
  const app = RouterExpress();
  Test(app);
  Users(app);
  Groups(app);
  Expenses(app);
  return app;
};
