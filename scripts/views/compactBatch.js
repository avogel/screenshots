define([
	'backbone',
	'views/compactScreenshot',
	'collections/batch'
], function(Backbone, CompactScreenshotView, Batch){

	var CompactBatchView = Backbone.View.extend({
		id: 'accordion',

		tagName: 'div',

		attributes: {
			'class': 'accordion',
		},

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
				var sc = new CompactScreenshotView({model: screenshots[i]}).render();
				this.$el.append(sc.el);
			}
			return this;
		},

	});

	return CompactBatchView;

});

