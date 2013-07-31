define([
	'backbone',
	'views/sc',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){
	var BtView = Backbone.View.extend({
		tagName: 'div',

		id: 'bt',

		attributes: {
			'class': 'span12',
			'style': 'margin-left: 0px'
		},

		screenshotViews : [],

		initialize: function(options){
			this.collection = options.collection;
			this.mode = options.mode;
			this.render();
		},

		render: function(){
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i<l; i++){
				var sc = new ScreenshotView({model: screenshots[i], mode: this.mode});
				sc1 = sc.render();
				this.screenshotViews.push(sc1);
				this.$el.append(sc1.el);
			}
			return this;
		}


	});

	return BtView;

});