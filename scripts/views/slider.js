define([
	'backbone',
	'jquery',
	'jqueryui/slider',
], function(Backbone, $){
	var SliderView = Backbone.View.extend({
		id: 'slider', 

		tagName: 'div',

		initialize: function(){
			this.$el.slider({'max': length});
			this.$el.slider("value", length);
			this.$el.css('margin-bottom', 20);
			this.$el.css('margin-top', 20)
		},

		render: function(){
			return this;
		}

	});

	return SliderView;
});