define([
	'backbone',
	'views/filterbutton',
	'collections/batch',
	'views/screenshot',
	'views/batch'
], function(Backbone, FilterButtonView, Batch, ScreenshotView, BatchView){

	var SidebarView = Backbone.View.extend({
		id: 'sidebarfilters',

		tagName: 'div',

		attributes:{
			"class": "btn-group btn-group-vertical",
			"data-toggle": "buttons-checkbox"
		},

		initialize: function(){
			this.render();
		},

		events: {
			'click .filter': 'filterBrowser',
		},

		render: function(){
			var screenshots = this.collection.models;
			console.log(this.collection.models);
			var browserList = _.uniq(_.toArray(this.collection.pluck("browser")));
			//var resolutionsList = _.uniq(_.toArray(this.collection.pluck("browser")));
			for(var i = 0, l=browserList.length; i<l; i++){
				var button = new FilterButtonView({model: this.collection.findWhere({'browser':browserList[i]})}).render();
				this.$el.append(button.el);
			}
			$("#sidebar").html(this.el);
			return this.el;
		},

	});

	return SidebarView;

});

