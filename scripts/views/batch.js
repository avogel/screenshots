define([
	'backbone',
	'views/screenshot'
], function(Backbone, ScreenshotView){

	var BatchView = Backbone.View.extend({
		id: 'page',

		views: {},

		initialize: function(){
			this.collection.bind('add', function(model){
				//console.log('initialize in batch');
				//console.log(model);
				//this.views[model.cid] 
				$(self.el).append(new ScreenshotView({model: model, id:'view_'+model.cid}).render());
			}, this);
			this.collection.bind('remove', function(model){
				this.views[model.cid].remove();
				delete this.views[model.cid];
			}, this);
		},
		render: function(){
			_.each( this.model.models, function( screenshot ){
				$(this.el).append(new ScreenshotView({model: model, id:'view_'+model.cid}).render());
			}, this);

			return this.el;
		}
	});

	return BatchView;

});

