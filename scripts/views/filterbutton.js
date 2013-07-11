define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var FilterButtonView = Backbone.View.extend({

		tagName: 'a',

		attributes:{"class": "btn btn-primary filter"},

		template: _.template('<%=browser%>'),

		events: {},

		initialize: function(){
			this.$el.attr('id',this.model.browser+"filter");
			this.render();
			// this.model.bind("change", this.render, this);
			// this.model.bind("destroy", this.close, this);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return FilterButtonView;

});