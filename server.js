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

app.get('/', index);
function index(req, res){
	res.sendfile('index.html');
}

//use this one for testing
app.get('/test', function(req, res){
  screenshots.getTestBatch(req, res);
});
app.get('/test/:id', function(req, res){
  screenshots.getTestById(req,res);
});
app.get'/batchIds', function(req, res){
	screenshots.getBatchIds(req,res);
}


app.get('/screenshots', screenshots.getMostRecentBatch);
app.get('/screenshots/:id', screenshots.getBatchById);

app.use(function(err, req, res, next){
  console.log(err.stack);
  res.send(500,'something broke');
});

app.listen(3000);
console.log('Listening on port 3000');

//function that creates the repeating cron job; executes at 9 am and 2 pm

// var createCron = function(){
//   var fileJSON = require('./requests.json');
//   var dataString = JSON.stringify(fileJSON);
//   var jobManager = new JobManager();
//   var job = new cronJob({
//     cronTime: '0 9,17 * 1-5 * ',
//     onTick: function(){
//       jobManager.createJob(fileJSON)
//     },
//     start: false,
//     timeZone: "America/New_York"
//   });
//   job.start();
// }
//var jobManager = new JobManager;
//jobManager.createCron();