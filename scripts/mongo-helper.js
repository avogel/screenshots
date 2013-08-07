var MongoClient = require('mongodb').MongoClient;

function mongoHelper(){

	//clear the test collection in browserstacktest
	this.clearDB = function(){
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots/:27017/browserstacktest", function(err, db){
			var collection = db.collection('test');
			collection.remove();
			db.close();
		});
	};

	//add a batch of photos
	this.addBatch = function(batch
		// TODO change the '/browserstacktest' part to what we want
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots/:27017/browserstacktest", function(err, db){
			if(err){
				console.log('err',err);
			}
			var collection = db.collection('test');
			collection.insert(batch, {w:1}, function(err, result){});
			db.close();
		});
		return true;
	};


	//returns the batchid string for the most recent photo batch
	//this is used to give a correct batchId to a batch after the
	//screenshots have been returned by browserstack
	this.getMostRecentBatchId = function(){
		var d = new Date();
		var date = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();

		//properly format month and date for database use:
		if(month <10){	month = "0"+month;	}
		if(date < 10){	date = "0"+date;	}

		var batchIdString = year+ month + date;

		//adds 0 at the end if it is the morning batch, 5 if it is the afternoon batch
		if(d.getHours()<=12) {
			batchIdString = batchIdString.concat('0');
		}
		else{
			batchIdString = batchIdString.concat('5');
		}
		return batchIdString;
	};

	//get batch of photos.  collection name is "monthdateyear1" eg "010420130" where the
	//trailing number is 0 for morning or 5 for evening batch.
	this.getBatch = function(req, res, batchId){
		// TODO change the '/browserstacktest' part to what we want
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots/:27017/browserstacktest", function(err, db){
			if(err){
				console.log(err);
			}
			var collection = db.collection('screenshots');
			db.collection.find(
				{
					batchId: batchId
				}
			)
			db.close();
			res.send(collection);
		});
	};

	this.getTestBatch = function(req, res){
		// TODO change the '/browserstacktest' part to what we want
		var output = [];
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots/:27017/browserstacktest", function(err, db){
			var collection = db.collection('test');
			collection.find().toArray(function(err, results){
				db.close();
				for(var r in results){
					output.push(results[r]);
					//console.log(results[r]);
				}
				//console.log(output);
				db.close();
				res.send(output);
			});
		});
		//console.log(output);
	};

	this.getTestById = function(req, res){
		var id = parseInt(req.params.id);
		var output = [];
		// TODO change the '/browserstacktest' part to what we want, also the collection
		MongoClient.connect("mongodb://localhost:27017/browserstacktest", function(err, db){
			var collection = db.collection('test');
			collection.find({"batchId": id}).toArray(function(err, docs){
				db.close();
				for(var r in docs){
					output.push(docs[r]);
				}
				res.send(output);
			});
		});
	};


	//TODO change test and url
	this.getBatchIds = function(req, res){
		var output = [];
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots//:27017/browserstacktest", function(err, db){
			var collection = db.collection('test');
			var ids = collection.distinct("batchId", function(err, docs){
				docs.sort();
				for(d in docs){
					if(typeof(docs[d]) == "number"){
						output.push(docs[d]);
					}
				}
				db.close();
				res.send(output);
			});
		});
	};

}
module.exports = mongoHelper;

