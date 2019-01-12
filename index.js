var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

var PORT = 3000;

// Initialize Express
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

app.get("/", function(req, res) {
    res.render("index");
    axios.get("https://www.refinery29.com/en-us").then(function(response) {
 
  var $ = cheerio.load(response.data);

  var results = [];

  $("div.card").each(function(i,element){

    var title = $(this).find("div.title").children("span").text();
    var brief = $(this).find("div.abstract").text();
    var link = $(this).children("a").attr("href");

    results.push({
      title: title,
      brief: brief,
      link: link
    });
  });

  console.log(results);

  db.Comment.create(req.body).then(function(dbComment) {
    return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {comments: dbComment}}).then(function(dbRes) {
      res.redirect("/");
    });
  })


 
});

  });

app.get("/saved", function(req, res) {
    res.render("saved");
  });


