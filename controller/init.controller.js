const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const InitClass = require("../class/init.class");
const CONFIG = require("../config/config.json");
const routes = require("../routes/routes");
require("dotenv").config();

let routeObj = {
  routes,
};

const Initclass = new InitClass(
  CONFIG,
  app,
  express,
  path,
  bodyParser,
  routeObj
);
Initclass.setMiddleware();
Initclass.setRoutes();
Initclass.runServer();
// Initclass.mongoDBConnect((err) => { // - DONOT REMOVE MOONGOOSE CONNECTION //
//   console.log(err);
// });
