define([
	'backbone',
	'views/sidebar',
	'views/batch',
	'collections/batch'
],
function(Backbone, SidebarView, BatchView, BatchCollection){
	var BodyView = Backbone.View.extend({
		id: 'body',

		tagName: 'div',

		attributes:{"class": "row-fluid"},

		template: _.template('<div id="sidebar" class="span2"></div><div id="content" class="row-fluid span10"></div>'),

		events: {
			"click .filter": "filter"
		},

		render: function(batch){
			this.$el.html(this.template());
			$('#container').append(this.$el);
			var sidebarView = new SidebarView({collection: this.initialBatch});
			var batchView = new BatchView({collection: batch});
			return this.el;
		},

		filter: function(ev){
			var workingBatch = this.initialBatch;
			var isActive = !($("#"+ev.target.id).hasClass('active'));
			var mostRecentlyClicked = ev.target.text;
			var activeBrowsers = {};
			var activeButtons = $("#sidebar .active");
			
			//logic for keeping track of which butons are clicked.
			for(var i = 0, l = activeButtons.length; i< l; i++){
				if(activeButtons[i].text != mostRecentlyClicked){
					activeBrowsers[activeButtons[i].text] = true;
				}
			}
			if(isActive){
				activeBrowsers[(ev.target.text)] = true;
			}

			//do the filtering here
			var filtered = _.filter(workingBatch.models, function(item){
				return activeBrowsers.hasOwnProperty(item.get("browser"));
			});
			var filteredCollection = new BatchCollection();
			for(var i = 0, l = filtered.length; i< l; i++){
				filteredCollection.add(filtered[i]);
			}
			this.render(filteredCollection);
			
		}
	});

	return BodyView;
});