define([
	'backbone',
	'views/screenshot',
	'collections/batch'
], function(Backbone, ScreenshotView, Batch){

	var BatchView = Backbone.View.extend({
		id: 'thumbnails',

		tagname: 'ul',

		initialize: function(){
			this.render();
		},


		render: function(){
			var screenshots = this.collection.models;
			var l = screenshots.length;
			for(var i = 0; i< l; i++){
				var sc = new ScreenshotView({model: screenshots[i]}).render();
				this.$el.append(sc.el);
			}
			console.log(this);
			$("#content").html(this.el);
			return this;
		}
	});

	return BatchView;

});

