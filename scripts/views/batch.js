define([
	'backbone',
	'views/screenshot',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){

	var BatchView = Backbone.View.extend({
		id: 'thumbnails',

		tagName: 'div',

		screenshotViews: [],

		initialize: function(){
			this.render();
		},

		// events: {
		// 	"click a#ie": "viewIE",
		// },

		render: function(){
			console.log(this);
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i< l; i++){
				var sc = new ScreenshotView({model: screenshots[i]}).render();
				this.screenshotViews.push(sc);
				this.$el.append(sc.el);
			}
			return this;
		},

	});

	return BatchView;

});

