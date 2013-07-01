var MongoClient = require("mongodb").MongoClient;

function test(callback){
	var output = [];
	MongoClient.connect("mongodb://localhost:27017/browserstacktest", function(err, db){
		console.log('client has been connected');
		var collection = db.collection('test');
		collection.find().toArray(function(err, results){
			db.close();
			//console.log(results);
			callback(results);
		});
	});
}

var t = test(console.log);