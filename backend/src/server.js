import express from "express";
import appconfig from "./lib/express.js";

const port = 3001;

async function startServer() {
    const app = express();
    await appconfig({ app });
  
    app && app.listen(port, () => {
        console.log("Server Online on port:",port)
        console.log(`--------------------------  `);
        console.log(`     /\\ `);
        console.log(`    ( /   @ @    () `);
        console.log(`     \\  __| |__  / `);
        console.log(`      -/   "   \\- `);
        console.log(`     /-|       |-\\ `);
        console.log(`    / /-\\     /-\\ \\ `);
        console.log(`     /  /-----\\ \ `);
        console.log(`       /       \\ `);
        console.log(`--------------------------  `);
    });
}

startServer() 