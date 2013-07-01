var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


ImageProvider = function(host, port){
	this.db = new Db('node-mongo-images', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){});
}

ImageProvider.prototype.getCollection = function(callback){
	this.db.collection('images', function(error, image_collection){
		if(error) callback(error);
		else callback(null, image_collection);
	});
};

//create new collection
ImageProvider.prototype.

//finds all images
ImageProvider.prototype.findAll = function(callback){
	this.getCollection(function(error, image_collection){
		if(error) callback(error);
		else{
			image_collection.find().toArray(function(error, results){
				if(error) callback(error);
				else callback(null, results);
			})
		}
	})
}

//save new images
ImageProvider.prototype.save = function(images, callback){
	this.getCollection(function(error, image_collection){
		if (error) callback (error);
		else{
			if (typeof(images.length) == "undefined"){
				images = [images];
			}

			for (var i = 0; i < images.length; i++){
				images = images[i];
				images.created_at = new Date();
			}

			image_collection.insert(images, function(){
				callback(null, images);
			});
		}
	});
};

module.exports = ImageProvider;