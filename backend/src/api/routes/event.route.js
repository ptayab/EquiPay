import { Router } from "express";
import { EventDatabase } from "../../lib/database.js"

const route = Router();
export default (app) => {
    app.use("/event", route);

    route.get("/", async (req, res) => {
        try {
            const { user, id } = req.query;
            if (user) {         // Search by name
                console.log("Route: /Event - Return all events for user")
                const eventData = await EventDatabase.getEventsByUserID(user);
                res.json({ message: "Success", data: eventData });
            } else if (id) {     // Search by ID
                console.log("Route: /Event - Return event by id")
                const eventData = await EventDatabase.getEventById(id);
                res.json({ message: "Success", data: eventData });
            } else {
                res.status(500).json({ message: "Failure; Event Not Found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failure" });
        }
    });

    route.post('/', async (req, res) => {
        console.log('Creating New Event');
        try {
            const eventData = req.body;
            if (!eventData || typeof eventData !== 'object') {
                return res.status(400).json({ message: 'Invalid JSON data' });
            }
            const createdEvent = await EventDatabase.createNewEvent(eventData);
            res.json({ message: 'Event created successfully', data: createdEvent });
        } catch (error) {
            res.status(500).json({ message: 'Error creating event' });
        }
    });
};



