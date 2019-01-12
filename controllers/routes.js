var express = require("express");
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var routes = require("./controllers/routes.js");
var exphbs = require("express-handlebars");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
    axios.get("https://www.nytimes.com/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("div.credit-list__content").each(function(i,element){

    var title = $(element).children().text();
    var link = $(element).find("a").find("img").attr("srcset").split(",")[0].split(" ")[0];

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

  });

  router.get("/saved", function(req, res) {
    res.render("saved");
  });


module.exports = router;