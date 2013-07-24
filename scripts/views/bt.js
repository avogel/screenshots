define([
	'backbone',
	'views/sc',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){
	var BtView = Backbone.View.extend({
		tagName: 'div',

		attributes: {},

		screenshotViews : [],

		initialize: function(options){
			this.collection = options.collection;
			this.mode = options.mode;
			console.log(this);
			this.render();
		},

		render: function(){
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i<l; i++){
				var sc = new ScreenshotView({model: screenshots[i], mode: this.mode}).render();
				this.screenshotViews.push(sc);
				this.$el.append(sc.el);
			}
			return this;
		}


	});

	return BtView;

});