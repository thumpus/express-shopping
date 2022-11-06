const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use("/", routes);

/** 404 handler */

app.use(function(req, res, next) {
    return new ExpressError("Not Found", 404);
  });
  
  /** general error handler */
  
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  
  module.exports = app;



