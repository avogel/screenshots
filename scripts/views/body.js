define([
	'backbone',
	'views/sidebar',
	'views/batch',
	'views/slider',
	'views/compactBatch',
	'collections/batch',
	'models/batch',
	'text!/templates/body.tpl'
],
function(Backbone, SidebarView, BatchView, SliderView, CompactBatchView, BatchCollection, BatchModel, Template){
	var BodyView = Backbone.View.extend({
		id: 'body',

		tagName: 'div',

		views: {},

		mode: 'browse',

		attributes:{"class": "row-fluid"},

		template: _.template(Template.replace(/(\r\n|\n|\r)/gm,"")),//'<div id="sidebar" class="well span2"></div><div id="content" class="row-fluid span10"><div class="span12 header" id="header"><h1>Screenshots</h1><div class="row-fluid"><h3 id="count" class="pull-right"></h3><h3 id="date" class="pull-right">date</h3></div></div></div>'),

		events: {
			"click .filter": "filter",
			"click #mode" : "switchMode",
			"mousedown .ui-slider-handle": "test",
		},

		test: function(){
			$("#slider").slider({
				//this will be called when the slider stops sliding.
				slide: function(){
					var value = $("#slider").slider("value");
					var today = new Date();
					var slideDiff = 100-value;
					if(slideDiff%2 == 0){
						
					} else{

					}
					$("#date").html(today.toDateString());
				}
			});
		},

		initialize: function(batch){
			this.initialBatch = batch || {};
			this.batchModel = new BatchModel(batch);
		},

		render: function(batch){
			this.$el.html(this.template());
			$('#container').html(this.$el);
			this.renderSidebar(batch);
			this.renderContent(batch);
			// var modeButton = $('<a/>',{
			// 	text: 'Switch to Compact',
			// 	id: 'mode',
			// 	class: 'btn btn-danger pull-left'
			// });
			// $("#header").append(modeButton);
			this.renderSlider();
			return this;
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

		renderSlider: function(){
			var sliderView = new SliderView();
			this.views['slider'] = sliderView.render();
			$("#header").append(sliderView.render().el);
		},	 

		renderContent: function(batch){
			this.mode= 'browse';
			if(this.views['content'] != undefined){
				this.views['content'].remove();
			}
			var batchView = new BatchView({collection: batch});
			this.views['content'] = batchView;
			$("#content").append(batchView.el);
			$("#count").html($(".screenshot").length+' screenshots match these filters');

		},

		renderCompact: function(batch){
			this.mode = 'compact';
			if(this.views['content'] != undefined){
				this.views['content'].remove();
			}
			var compactBatchView = new CompactBatchView({collection: batch});
			this.views['content'] = compactBatchView;
			$("#content").append(compactBatchView.el);
			$("#count").html($(".accordion-group").length+' screenshots match these filters');
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
				$("#mode").html('Switch to Compact');
				this.filter(ev);
			} else if(this.mode=='browse'){
				this.mode = 'compact';
				$("#mode").html('Switch to Browse');
				this.filter(ev);
			}
		},

		dateHash: function(javascriptDateObject){
			var date = d.getDate();
			var month = d.getMonth();
			var year = d.getFullYear();

			//properly format month and date for database use:
			if(month <10){	month = "0"+month;	}
			if(date < 10){	date = "0"+date;	}

			var batchIdString = month + date + year;

			//adds .1 at the end if it is the morning batch, .2 if it is the afternoon batch
			if(d.getHours()<=12) {
				batchIdString = batchIdString.concat('0');
			}
			else{
				batchIdString = batchIdString.concat('5');
			}
			return batchIdString;
		}

	});

	return BodyView;
});