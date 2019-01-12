var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var routes = require("./controllers/routes.js");
var exphbs = require("express-handlebars");

var PORT = 3000;

// Initialize Express
var app = express();


app.use(routes);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

// app.get("/", function(req, res) {
//     res.render("index");
//   });

