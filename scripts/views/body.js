define([
	'backbone',
	'views/sidebar',
	'views/batch',
	'views/compactBatch',
	'collections/batch'
],
function(Backbone, SidebarView, BatchView, CompactBatchView, BatchCollection){
	var BodyView = Backbone.View.extend({
		id: 'body',

		tagName: 'div',

		views: {},

		mode: 'browse',

		attributes:{"class": "row-fluid"},

		template: _.template('<div id="sidebar" class="well span2"></div><div id="content" class="row-fluid span10"><div class="span12 header"><h1>Screenshots</h1></div></div>'),

		events: {
			"click .filter": "filter",
			"click #mode" : "switchMode",
		},

		initialize: function(batch){
			this.initialBatch = batch || {};
			//this.renderSidebar();
		},

		render: function(batch){
			this.$el.html(this.template());
			$('#container').html(this.$el);
			this.renderSidebar(batch);
			this.renderContent(batch);
			//return this.el;
		},

		renderSidebar: function(batch){
			if (this.views['sidebar'] != undefined){
				this.views['sidebar'].remove();
				var sidebarView = SidebarView({collection: batch});
			} else{
				var sidebarView = new SidebarView({collection: this.initialBatch});
			}
			this.views['sidebar'] = sidebarView;
			$("#sidebar").append(this.views['sidebar'].el);
		},	 

		renderContent: function(batch){
			this.mode= 'browse';
			if(this.views['content'] != undefined){
				this.views['content'].remove();
			}
			var batchView = new BatchView({collection: batch});
			this.views['content'] = batchView;
			$("#content").append(batchView.el);
		},

		renderCompact: function(batch){
			this.mode = 'compact';
			if(this.views['content'] != undefined){
				this.views['content'].remove();
			}
			var compactBatchView = new CompactBatchView({collection: batch});
			this.views['content'] = compactBatchView;
			$("#content").append(compactBatchView.el);
		},

		filter: function(ev){
			console.log(ev);
			var workingBatch = this.initialBatch;
			var isActive = ($("#"+ev.target.id).hasClass('btn-primary'));
			var mostRecentlyClicked = ev.target.text;
			var activeBrowsers = {};
			var activeButtons = $("#sidebar .btn-primary");
			
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
			console.log(this.mode);
			if(this.mode == 'browse'){
				this.renderContent(filteredCollection);
			}
			else if(this.mode == 'compact'){
				this.renderCompact(filteredCollection);	
			}
		},

		switchMode: function(ev){
			if(this.mode == 'compact'){
				this.mode = 'browse';
				$("#mode").html('compact');
				this.filter(ev);
			} else if(this.mode=='browse'){
				this.mode = 'compact';
				$("#mode").html('browse');
				this.filter(ev);
			}
		}
	});

	return BodyView;
});