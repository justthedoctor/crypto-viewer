// |--------------- Crypto-Viewer -----------------------------|
// |-- This project is currently under major development     --|
// |-- More information will follow as development Progreses --|
// |-----------------------------------------------------------|

    // set the initial vars utilizing node_modules
  var path = require('path');
  var request = require('request');
  var express = require('express');
  var app = express();


      // Set the Pug Engine and Pug Source DIR
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));

      // Some Variasbles to make Editing easier
        var httpPort = 5152;
        var httpHost = "localhost";

      var server = app.listen(httpPort, httpHost, function () {
          console.log('HTTP running on http://' + httpHost + ':' + httpPort);
      });

          // Setup the function of replying to http://httpHost:httpPort/
        app.get("/", (req, res) => {
          res.render("index");
        });

          // Setup the function of replying to http://httpHost:httpPort/
        app.get("/admin", (req, res) => {
          res.render("admin/index");
        });
