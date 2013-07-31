var MongoClient = require('mongodb').MongoClient;

function mongoHelper(){

	this.clearDB = function(){
		MongoClient.connect("mongodb://ec2-50-17-56-184.compute-1.amazonaws.com/nyt5_screenshots/app/screenshots/:27017/browserstacktest", function(err, db){
			var collection = db.collection('test');
			collection.remove();
			db.close();
		});
	};

		//add a batch of photos
	this.addBatch = function(batch){
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
	this.getMostRecentBatchId = function(){
		var date = new Date();
		return this.getPastBatchId(date);
	};

	//takes a javascript date object, and returns the batchid string for the given date
	this.getPastBatchId = function(d){
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

// var test = new mongoHelper();
// var input = [ { url: 'http://nytimes.com',
//     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
//     device: null,
//     os: 'Windows',
//     created_at: '2013-06-24 21:46:02 UTC',
//     id: 'abc26cae747c04495537caf7f79654a606c67f4a',
//     state: 'done',
//     os_version: '7',
//     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
//     orientation: null,
//     browser: 'ie',
//     batchId: 010320130,
//     browser_version: '9.0' },
//   { url: 'http://nytimes.com',
//     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/macml_firefox_4.0.jpg',
//     device: null,
//     os: 'OS X',
//     created_at: '2013-06-24 21:46:02 UTC',
//     id: '0b12ebaccb0bce7919401eb1696cd1c7fa52f84a',
//     state: 'done',
//     os_version: 'Mountain Lion',
//     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_macml_firefox_4.0.jpg',
//     orientation: null,
//     batchId: 010320130,
//     browser: 'ie',
//     browser_version: '8.0' },
//   { url: 'http://nytimes.com',
//     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/maclion_chrome_18.0.jpg',
//     device: null,
//     os: 'OS X',
//     created_at: '2013-06-24 21:46:02 UTC',
//     id: '24003a3732d27407ae9272a16ef63a0bc6a68f3c',
//     state: 'done',
//     os_version: 'Lion',
//     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_maclion_chrome_18.0.jpg',
//     orientation: null,
//     batchId: 010320130,
//     browser: 'ie',
//     browser_version: '10.0' },
//   { url: 'http://nytimes.com',
//     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win8_firefox_16.0.png',
//     device: null,
//     os: 'Windows',
//     created_at: '2013-06-24 21:46:02 UTC',
//     id: '0989acb982cc85bcea6794d803b211f08a7814a7',
//     state: 'done',
//     os_version: '8',
//     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win8_firefox_16.0.jpg',
//     batchId: 010320130,
//     orientation: null,
//     browser: 'ie',
//     browser_version: '9.0' } ];

// test.addBatch(input);
