define([
	'backbone',
	'models/screenshot'
], function(Backbone, Screenshot){
	//a batch is defined as the group of screenshots taken in the same cron job
	var Batch = Backbone.Collection.extend({
		model: Screenshot,
		//TODO change this to be the right thing
		url: '/test',

		filterByBrowser: function(browser){
			return _(this.filter({"browser":browser}));
		},

		getByBatchId: function(batchId){
			this.url = '/test/'+batchId;
			this.fetch();
		},


	});

	return Batch;
});
