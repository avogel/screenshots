define([
	'backbone',
	'models/screenshot'
], function(Backbone, Screenshot){
	//a batch is defined as the group of screenshots taken in the same cron job
	var Batch = Backbone.Collection.extend({
		model: Screenshot,
		url: ''
	});

	return Batch;
});
