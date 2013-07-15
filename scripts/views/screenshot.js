define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var ScreenshotView = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			'class': 'span6 marker',
		},

		template: _.template('<h4 class="screenshotTitle"><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></h4><a href=<%= image_url%> ><img class="screenshot" src= <%= image_url%> ></a>'),

		events: {
		},

		initialize: function(){
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.close, this);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

	});

	return ScreenshotView;

});