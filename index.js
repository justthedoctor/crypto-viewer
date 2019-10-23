// |--------------- Crypto-Viewer -----------------------------|
// |-- This project is currently under major development     --|
// |-- More information will follow as development Progreses --|
// |-----------------------------------------------------------|

          // set the initial vars utilizing node_modules
  var path = require('path');
  var request = require('request');
  var bodyParser = require('body-parser');
  var urlencodedParser = bodyParser.urlencoded({ extended: true });
  var express = require('express');
  var app = express();
  cvaVersion = "0.0.2";


          // Set the Pug Engine and Pug Source DIR
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));

          // Some Variasbles to make Editing easier
        var httpPort = 5150;
        var httpHost = "localhost";

      var server = app.listen(httpPort, httpHost, function () {
          console.log('HTTP running on http://' + httpHost + ':' + httpPort);
          console.log('Version:'+ cvaVersion);
      });

          // Gather information for the setup of which coin network to read from
      request.get("https://chainz.cryptoid.info/explorer/api.dws?q=summary", (error, response, body) => {
        summaryParse = JSON.parse(body);
        summaryStringify = JSON.stringify(body);
        summaryCoinName = Object.values(summaryParse).map(entry => entry.name);
      })

          // Setup the function of replying to http://httpHost:httpPort/
      app.use('/public', express.static('public'))

      app.get("/", (req, res) => {
          res.render("index");
      });

      app.post("/opreturn", urlencodedParser, (req, res) => {
        res.render("opreturn");
      });

          // Setup the function of replying to http://httpHost:httpPort/
      app.get("/admin", (req, res) => {
          res.render("admin/index");
      });
