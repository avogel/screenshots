define([
	'backbone',
	'models/screenshot'
], function(Backbone, Screenshot){
	//a batch is defined as the group of screenshots taken in the same cron job
	var Batch = Backbone.Collection.extend({
		model: Screenshot,

		batchId: "",

		initialize: function(options){
			console.log('created a batch');
			if(options){
				this.batchId = options.batchId;
			}
		},

		//TODO change this to be the right thing
		url: function(){
			return '/test/'+this.batchId;
		},

		filterByBrowser: function(browser){
			return _(this.filter({"browser":browser}));
		},

		// getByBatchId: function(batchId){
		// 	this.url = '/test/'+batchId;
		// 	//this.fetch();
		// 	//return this;
		// },


	});
	return Batch;
});
