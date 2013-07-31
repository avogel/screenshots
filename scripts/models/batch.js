define([
	'backbone',
	'collections/batch',
], function(Backbone, BatchCollection){

	var Batch = Backbone.Model.extend({

		batchCollection : new BatchCollection(),

		idAttribute: "batchId",

		initialize: function(collection){
			this.batchCollection = collection;
		},

	});

	return Batch;
});