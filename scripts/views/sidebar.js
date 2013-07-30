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

		views: [],

		attributes:{
			"class": "btn-group btn-group-vertical",
		},

		initialize: function(){
			this.render();
		},

		events: {
			'click .filter': 'filterButtonHandler',
		},

		render: function(){
			console.log(this);
			var screenshots = this.collection.models;
			var browserList = _.uniq(_.toArray(this.collection.pluck("browser")));
			//var resolutionsList = _.uniq(_.toArray(this.collection.pluck("browser")));
			for(var i = 0, l=browserList.length; i<l; i++){
				var button = new FilterButtonView({model: this.collection.findWhere({'browser':browserList[i]})}).render();
				this.$el.append(button.el);
			}
			return this;
		},

		filterButtonHandler: function(ev){
			$("#"+ev.target.text+"filter").toggleClass('btn-primary').toggleClass('btn-inverse');
		}

	});

	return SidebarView;

});

