var http = require('http');
var events = require('events');
var util = require('util');
var cronJob = require('cron').CronJob;
var MongoHelper = require('./mongo-helper');
var async = require('async');


function JobManager(){
	events.EventEmitter.call(this);

  	//the json worker returned by the browserstack api on requests. Used to keep track of job_id along with the images produced
  	this.setWorker = function(worker){
    	this.json_worker = worker;
  	};

  	//creates the requests specified in the json_browsers passed in
  	this.createJob = function(json_browsers){
	    var dataString = JSON.stringify(json_browsers);
	    //var dataString = JSON.stringify(data);
	    var headers = {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json', 
	      'Content-Length': dataString.length
	    };

	    var options = {
	      hostname: 'www.browserstack.com',
	      method: 'POST',
	      path: '/screenshots',
	      headers: headers,
	      auth: 'nyt5_dev@nytimes.com:nytpass'
	    };

	    //create request for browserstack
	    var req = http.request(options, function(res){
		    res.setEncoding('utf8');
		    var responseString = '';
		    res.on('data', function (chunk) {
		      responseString += chunk;
		    });

		    res.on('end', function(){

		      	var resultObject = JSON.parse(responseString);
		    	if (res.statusCode == 200){
		        	var jobManager = new JobManager();
		        	jobManager.setWorker(resultObject);
		        	jobManager.on('repeat', function(){
		         		console.log("repeating the check");
		        	});
		        	jobManager.on('done', function(images){
		          		var mongoHelper = new MongoHelper();
		          		var batchId = mongoHelper.getMostRecentBatchId();

		          		//adds batch field for better sorting
		          		async.each(images, function(item, callback){
		          			item.batchId = batchId;
		          			callback();
		          		}, function(e) {
		          			console.log(e);
		          		});

		          		//handles adding the new batch to the database
		          		
		          		mongoHelper.addBatch(images);

		        	});
		        	jobManager.on('timeouts',function(timeouts){
		          		//createJob with these
		          		var redos = {"browsers":[],"url":"http://nytimes.com"};
		          		for(var i = 0; i < timeouts.length; i++){
		            		redos.browsers[i] = {};
		            		redos.browsers[i].os = timeouts[i].os;
		            		redos.browsers[i].os_version = timeouts[i].os_version;
		            		redos.browsers[i].browser_version = timeouts[i].browser_version;
		            		redos.browsers[i].browser = timeouts[i].browser;
		          		}
		          		jobManager.createJob(redos);

		        	});
		        	jobManager.on('error', function(e){
		          		console.log("there was an error with the worker: "+e);
		        	});
		        	jobManager.checkJobState();
		      	}
		      	if(res.statusCode == 422){
		        	console.log("RECIEVED 422 STATUS CODE: "+ responseString);
		      	}
		      	else if(res.statusCode == 500){
		      		console.log("There seems to be an error at browserstack");
		      		console.log(responseString);
		      	}
		      	else if(res.statusCode != 200){
		        	console.log("Status: " + res.statusCode+"; "+ responseString);
		      	}
		    });
	  	});
	  	req.write(dataString);
	  	req.on('error', function(e){
	    	console.log(e);
	  	});
	  	req.end();
  	};

  	//function that creates the repeating cron job; executes at 9 am and 2 pm
  	this.createCron = function(){
  	  var fileJSON = require('./requests.json');
  	  var dataString = JSON.stringify(fileJSON);
  	  var job = new cronJob({
  	    cronTime: '0 9,17 * 1-5 * ',
  	    onTick: function(){
  	      this.createJob(fileJSON)
  	    },
  	    start: false,
  	    timeZone: "America/New_York"
  	  });
  	  job.start();
  	}

  	this.checkJobState = function(){
    	var self = this;
    	var json_worker = self.json_worker;
    	var id;
	    if("job_id" in json_worker){
	      id = json_worker.job_id;
	    }
	    else if("id" in json_worker){
	      id = json_worker.id;
	    }
	    console.log("checking...");


	    if(json_worker.state != "done"){
	    	//sets timeout to check the statuses of all screenshots in 10 seconds
	      	setTimeout(function(){
	        var path = "/screenshots/"+id+".json";
	        var options = {
	          hostname: 'www.browserstack.com',
	          path: path,
	          auth:'nyt5_dev@nytimes.com:nytpass'
	        };
	        var req = http.request(options, function(res){
	          res.setEncoding('utf8');
	          var responseString = '';

	          res.on('data',function(data){
	            responseString += data;
	          });

	          res.on('end', function(){
	            var resultObject = JSON.parse(responseString);
	            self.json_worker = resultObject;
	            self.checkJobState();

	          });
	        });
	        req.on('error', function(e){
	          console.log(e);
	          self.emit('error', e);
	        });
	        req.end();
	      },10000);
	    }
	    else{
	    	//job has finished
	      	var didTimeout = false;
	      	var timeouts = [];
	      	try{
	        	var images = [];
	        	for(var i = 0; i< json_worker.screenshots.length; i++){
	        		screenshot = json_worker.screenshots[i];
	          		if(screenshot.state == "timeout"){
	            		didTimeout = true;
	            		timeouts.push(screenshot);
	            		console.log('unsuccessfull image added');
	          		}
	          		else if(screenshot.state == "done"){
	            		console.log('successful image added');
	            		images.push(screenshot);
	          		}
	        	}
	        	if(didTimeout){
	          		self.emit('timeouts', timeouts);
	        	}
	        	self.emit('done', images);
	      	}
	      	catch(e){
	        	self.emit('error', e);
	      	}
	    }
	};
}


util.inherits(JobManager, events.EventEmitter);
module.exports = JobManager;