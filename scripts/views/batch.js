define([
	'backbone',
	'views/sc',
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
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i< l; i++){
				console.log('create a screenshot view')
				var sc = new ScreenshotView({model: screenshots[i], mode: 'browse'}).render();
				console.log(sc);
				this.screenshotViews.push(sc);
				this.$el.append(sc.el);
			}
			return this;
		},

	});

	return BatchView;

});

