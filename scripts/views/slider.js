define([
	'backbone',
	'jquery',
	'jqueryui/slider',
], function(Backbone, $){
	var SliderView = Backbone.View.extend({
		id: 'slider', 

		tagName: 'div',

		initialize: function(){
			console.log(this);
			//console.log(jquerySlider);
			this.$el.slider();
			this.$el.slider("value", 100);
		},

		render: function(){
			return this;
		}

	});

	return SliderView;
});