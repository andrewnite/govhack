
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  request = require('request'),
  Task = require('./models/eventsModel'),
  bodyParser = require('body-parser'),
  parks_data = [];
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ghmongo:27017/Eventsdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function loadDataFile(){
// Get the data file.
    request("https://data.sunshinecoast.qld.gov.au/resource/adry-tzke.json", function (error, response, body) {
        if (response && response.statusCode == 200){
            parks_data = JSON.parse(body);
            console.log(parks_data.length);
        }
        else{
            console.log(error);
        }
    });
}

var routes = require('./eventsRoutes');
routes(app);

// Return a random park from the list.
app.get('/random_park', function (req, res) {
    res.send(parks_data[Math.floor(Math.random()*parks_data.length)]);
});

loadDataFile();

app.listen(port);

console.log('Server started on: ' + port);