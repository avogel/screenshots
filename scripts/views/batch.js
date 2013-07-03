define([
	'backbone',
	'views/screenshot',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){

	var BatchView = Backbone.View.extend({
		id: 'thumbnails',

		tagName: 'ul',

		attributes: {'class': 'unstyled'},

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
				var sc = new ScreenshotView({model: screenshots[i]}).render();
				this.$el.append(sc.el);
			}
			//console.log(this);
			$("#content").html(this.el);
			var browsers = _.uniq()
			return this;
		},

		viewIE: function(){
			console.log('ieieie');
		}
	});

	return BatchView;

});

