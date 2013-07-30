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
		},

		render: function(){
			console.log('rendering slider');
			console.log(this);
			return this;
		}

	});

	return SliderView;
});