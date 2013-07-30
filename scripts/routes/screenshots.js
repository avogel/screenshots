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
	mongoHelper.getTestById(req,res);
};

//TODO fix with the template above
exports.getBatchById = function(req, res){
	var batchId = req.params.id;
	var mongoHelper = new MongoHelper();
	var mostRecentBatchId = mongoHelper.getMostRecentBatchId();
	var batch = mongoHelper.getBatch(mostRecentBatchId);
	res.send(batch);
};

