import express from "express";
import appconfig from "./lib/express.js";

const port = process.env.PORT || 4000;

async function startServer() {
    const app = express();
    appconfig({ app });
  
    app && app.listen(port, () => {
        console.log(`Starting Server....  `);
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
        console.log(`Accessible at http://localhost:${port}`)
    });
}

startServer() 