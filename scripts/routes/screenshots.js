var MongoHelper = require('../mongo-helper');
var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;

//get the most recent batch
exports.getMostRecentBatch = function(req, res) {
    var mongoHelper = new MongoHelper();
    var mostRecentBatchId = mongoHelper.getMostRecentBatchId();
    var batch = mongoHelper.getBatch(mostRecentBatchId);
};

//gets the test batch, used for testing
exports.getTestBatch = function(req, res){
	var mongoHelper = new MongoHelper();
	mongoHelper.getTestBatch(req, res);
};

exports.getBatchIds = function(req, res){
	var mongoHelper = new MongoHelper();
	mongoHelper.getBatchIds(req,res);
}

exports.getTestById = function(req, res){
	var mongoHelper = new MongoHelper();
	var id = req.params.id;
	// TODO change the '/browserstacktest' part to what we want, also the collection
	MongoClient.connect("mongodb://localhost:27017/browserstacktest", function(err, db){
		var collection = db.collection('test');
		collection.find({batchId: id}).toArray(function(err, result){
			db.close();
			res.send(result);
		});
	});
};

//get a batch by the Id
exports.getBatchById = function(req, res){
	var batchId = req.params.id;
	var mongoHelper = new MongoHelper();
	var mostRecentBatchId = mongoHelper.getMostRecentBatchId();
	var batch = mongoHelper.getBatch(mostRecentBatchId);
	res.send(batch);
};

