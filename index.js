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
  cvaVersion = "0.0.2a";
  defaultlookupAddress = "PEmgkyPnU7GCr4CCRU9hi4v2AmwBiQy6JM";

          // Set the Pug Engine and Pug Source DIR
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));

          // Some Variasbles to make Editing easier
        var httpPort = 5150;
        var httpHost = "localhost";

      var server = app.listen(httpPort, httpHost, function () {
        console.log('Crypto-Viewer Version:'+ cvaVersion);
        console.log('HTTP running on http://' + httpHost + ':' + httpPort);
      });

          // Gather information for the setup of which coin network to read from
      request.get("https://chainz.cryptoid.info/explorer/api.dws?q=summary", (error, response, body) => {
        if(error) {
          summaryError = error;
        }

        summaryParse = JSON.parse(body);
        summaryStringify = JSON.stringify(body);
        summaryCoinName = Object.values(summaryParse).map(entry => entry.name);
        summaryTicker = Object.keys(summaryParse);
        summaryCoinTickerName = Object.entries(summaryParse).map(([key, obj]) => ({key, name: obj.name}))
      })

      request.get(`https://chainz.cryptoid.info/pnd/api.dws?q=multiaddr&key=1a9c92c7492b&active=${defaultlookupAddress}`, (error, response, body) => {
        if(error) {
          addressError = error;
        }

        addressParse = JSON.parse(body);
        addressStringify = JSON.stringify(body);
      });

          // Setup the function of replying to http://httpHost:httpPort/
      app.use('/public', express.static('public'))

      app.get("/", (req, res) => {
        res.render("index");
      });

      app.get("/opreturn", (req, res) => {
        res.render("opreturn");
      });

          // Setup the function of replying to http://httpHost:httpPort/
      app.get("/admin", (req, res) => {
        res.render("admin/index");
      });
