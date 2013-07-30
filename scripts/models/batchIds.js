define([
	'backbone'
], function(Backbone){
	
	var BatchIds = Backbone.Model.extend({

		//pass in a slider view, which will have its 'ids' set on successful fetch
		initialize: function(view){
			this.ids = [];
			var self = this;
			this.fetch({
				error: function(model, response){
					console.log(response);
				},
				success:function(model, response){
					for(var r = 0, l = response.length; r< l; r++){
						if(typeof(response[r]) == "number"){
							self.ids.push(response[r]);
						}
					}

					view.$el.slider({'max': self.ids.length-1});
					view.$el.slider({'value': self.ids.length-1});
					view['values'] = self.ids;
				},
			});
		},

		url: '/batchIds'

	});

	return BatchIds;

});