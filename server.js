// dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

// initialize server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors()); // allow ajax request to skip origin policy and access resources from remote host, other server access
app.use(express.json()); // send/receive data as json for post requests

// db configuration
const db = require("./config/keys").ATLAS_URI;

// connect to MongoDB Atlas
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(function() {
    console.log("MongoDB database connection successfully established");
  })
  .catch(function(err) {
    console.log(err);
  });

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// require backend api routes
const usersRouter = require("./routes/api/users");
const propertiesRouter = require("./routes/api/properties");

// add routes as middleware
app.use("/api/users", usersRouter);
app.use("/api/properties", propertiesRouter);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    // load index react file for any path hit here
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// start server
app.listen(port, function() {
  console.log("Server running on port " + port);
});
