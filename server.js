// server.js
// where your node app starts

// init project
var express = require('express');
var dateFormat = require('dateformat');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:timestamp", function (req, res) {
  
  //Non-numeric regex check
  var pattern = /[^0-9]/g;
  var returnDate = {unix: null, natural: null};
  
  //Check if timestamp is Integer
  var timestamp = req.params.timestamp;
  if (pattern.test(timestamp)) {
        //Is not a valid Integer
        console.log(timestamp);
        try {
          returnDate.unix = new Date(dateFormat(timestamp, "longDate")).getTime();
          returnDate.natural = dateFormat(timestamp, "longDate");
        } catch(ex) {
          console.log(ex);
        }
      } else {
        //Is a valid Integer
        returnDate.unix = Number(timestamp);
        returnDate.natural = dateFormat(new Date(Number(timestamp)), "longDate");
      }
  
  res.json(returnDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
