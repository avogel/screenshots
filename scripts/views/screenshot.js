define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var ScreenshotView = Backbone.View.extend({

		tagName: 'li',

		template: _.template('<img class="screenshot" src= <%= thumb_url%> ><p><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></p>'),

		events: {},

		initialize: function(){
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.close, this);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return ScreenshotView;

});