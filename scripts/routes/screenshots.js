var MongoHelper = require('../mongo-helper');
var MongoClient = require('mongodb').MongoClient;


exports.getMostRecentBatch = function(req, res) {
    var mongoHelper = new MongoHelper();
    var mostRecentBatchId = mongoHelper.getMostRecentBatchId();
    var batch = mongoHelper.getBatch(mostRecentBatchId);
    //var testbatch = mongoHelper.getTestBatch();
    //res.send(batch);
};

exports.getTestBatch = function(req, res){
	var mongoHelper = new MongoHelper();
	//var testbatch = mongoHelper.getTestBatch(res.send);
	// console.log("*********************************");
	// console.log(testbatch);
	// console.log("*********************************");
	MongoClient.connect("mongodb://localhost:27017/browserstacktest", function(err, db){
		var collection = db.collection('test');
		collection.find().toArray(function(err, results){
			db.close();
			res.send(results);
		});
	});
	//res.send(testbatch);
}

exports.getBatchById = function(req, res){
	var batchId = req.body.id;
	var mongoHelper = new MongoHelper();
	var mostRecentBatchId = mongoHelper.getMostRecentBatchId();
	var batch = mongoHelper.getBatch(mostRecentBatchId);
	res.send(batch);
};

