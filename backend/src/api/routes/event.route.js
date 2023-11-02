import { Router } from "express";
import { EventDatabase } from "../../lib/database.js"

const route = Router();
export default (app) => {
    app.use("/event", route);

    route.get("/", async (req, res) => {
        try {
            const { user, id } = req.query;
            if (user) {         // Search by name
                const eventData = await EventDatabase.getEventsByUserID(user);
                res.json({ message: "Success", data: eventData });
            } else if (id) {     // Search by ID
                const eventData = await EventDatabase.getEventById(id);
                res.json({ message: "Success", data: eventData });
            } else {            // Return all
                const eventData = await EventDatabase.getUserList();
                res.json({ message: "Success", data: eventData });
            }
        } catch (error) {
            res.status(500).json({ message: "Failure" });
        }
    });

    const eventTemplate = {
        "name": "",
        "description": "",
        "owner": "",
        "members": ""
      }

    app.post('/create', async (req, res) => {
        try {
          const eventData = req.body;
          if (!eventData || typeof eventData !== 'object') { return res.status(400).json({ message: 'Invalid JSON data' }) }    

          const createdEvent = await EventDatabase.createNewEvent(eventData);
          res.json({ message: 'Event created successfully', data: createdEvent });
        } catch (error) {
          res.status(500).json({ message: 'Error creating event' });
        }
      });
};



