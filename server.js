var express = require('express');
var JobManager = require('./scripts/job-manager');
var screenshots = require('./scripts/routes/screenshots');
var app = express();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.use(express.static(__dirname + '/scripts'));

// This is the route used for the interface.
app.get('/', index);
function index(req, res){
	res.sendfile('index.html');
}

//use this one for testing
app.get('/test', function(req, res){
 	screenshots.getTestBatch(req, res);
});
app.get('/test/:id', screenshots.getTestById);

//this is used to get the Ids of all batches so the slider can render with proper intervals
app.get('/batchIds', function(req,res){
	screenshots.getBatchIds(req,res);
});

//This will be used for production version of the interface
app.get('/screenshots', screenshots.getMostRecentBatch);
app.get('/screenshots/:id', screenshots.getBatchById);

//used for internal 
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.send(500,'Internal Server error. Something broke.');
});

//The 404 route here
app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen(3000);
console.log('Listening on port 3000');

//function that creates the repeating cron job; executes at 9 am and 2 pm
//var jobManager = new JobManager;
//jobManager.createCron();
