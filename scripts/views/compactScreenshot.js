define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var CompactScreenshotView = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			'class': 'accordion-group',
		},

		template: _.template('<div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" href="#<%= id %>collapse"><h4 class="screenshotTitle"><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></h4></a></div><div class="accordion-body collapse" id="<%=id%>collapse"><div class="accordion-inner"><img class="screenshot collapsable" src= <%= image_url%> ></div></div>'),

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

	return CompactScreenshotView;

});