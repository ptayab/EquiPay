# EquiPay

## Running the project
Dev Mode:
```
npm run dev
```

Regular Mode:
```
npm run start
```
 

## Parts of the Backend Structure

### API
Stores the Express routes framework
SRC/API
   /router.js - An inbetween that has all the redirectors to the API routes.
                It makes sure that all the routes are preloaded so that there's no issues with 
                inaccessible routes
    /ROUTES
        /*,js - Each file in routes is associated with a route end point. All gets, posts, etc 
                for a route all all found in here


### Library
Stores function code
SRC/LIB 
   /datbase.js - an abstraction of the SQL database. It's designed to create and manage a single instance of 
                a database connector. Included logging, and prevents connection interception.
                Can also be ran as a RAM only database
    /db.config - A file that contains the configurations for a db. If no DB exists at the specified destination
                it uses this file as a reference. It has an array of table initializers, and field called
                "data" meant to hold any data that should exist after creation. It can any number of tables
                worth of data.
    /express.js - the configuration and core routing information for express

## 

### Database
Database lives here
SRC/DATA

### Public
/public - Static routed folder. If nothing is found in the routes, it'll check here before returnin 404

