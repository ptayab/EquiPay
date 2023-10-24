import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from "method-override";
import routes from "../api/index.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const pubPath = path.join(dirname(dirname(fileURLToPath(import.meta.url))), "public");

export default ({ app }) => {
  /**
   * API Status Check !!
   */
  app.get("/status", (req, res) => {
    res.status(200).json({ status: "Server is online, and API is responding" });
  });
  app.head("/status", (req, res) => { res.status(200).end(); });

  /* Setting up basics */
  app.enable("trust proxy");
  app.use(cors());
  app.use(methodOverride());
  app.use(bodyParser.json());


  app.use(express.static('public'));

  // Load API routes with /api
  app.use('/api', routes());

  /// catch 404 and forward to error handler
  app.use(( req, res, next) => {
      const err = new Error("Not Found");
      next(err);
    }
  );

  /// error handlers
  app.use(( err, req, res, next ) => {
      /**
       * Handler 401
       */
      if (err.name === "UnauthorizedError") {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );
  app.use(( err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};