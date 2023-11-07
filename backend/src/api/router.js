import { Router as RouterExpress } from "express";
import Test from "./routes/test.route.js"
import User from "./routes/users.route.js"
import Groups from "./routes/groups.route.js"
import Event from "./routes/event.route.js"

// guaranteed to get dependencies
export default () => {
  const app = RouterExpress();
  Test(app);
  User(app);
  Groups(app);
  Event(app);
  return app;
};
