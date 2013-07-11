define([
	'backbone',
	'views/screenshot',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){

	var BatchView = Backbone.View.extend({
		id: 'thumbnails',

		tagName: 'div',

		initialize: function(){
			this.render();
		},

		// events: {
		// 	"click a#ie": "viewIE",
		// },

		render: function(){
			$("#content").append("<div class='span10 header'><h1>Screenshots</h1></div>");
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i< l; i++){
				var sc = new ScreenshotView({model: screenshots[i]}).render();
				if(i == 0){
					$(".marker").attr('id','firstScreenshot')
					console.log(sc);
				}
				this.$el.append(sc.el);
			}
			$("#content").append(this.el);
			return this;
		},

	});

	return BatchView;

});

