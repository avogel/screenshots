define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var ScreenshotView = Backbone.View.extend({

		tagName: 'div',

		template: _.template('<img class="screenshot" src= <%= thumb_url%> ><p><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></p>'),

		initialize: function(){
			_.bindAll(this, 'render');
			this.render();
		},

		render: function( req, res){
			console.log(this.model)
			var dict = this.model.toJSON();
			var html = this.template(dict);
			$("#content").append(this.el);
			$(this.el).html(this.template(this.model));
			return this.el;
		}
		//events:{}
	});

	return ScreenshotView;

});