define([
	'backbone',
	'views/sidebar',
	'views/bt',
	'views/slider',
	'collections/batch',
	'models/batch',
	'models/batchIds',
	'text!templates/body.tpl'
],
function(Backbone, SidebarView, BatchView, SliderView, BatchCollection, BatchModel, BatchIdsModel, Template){
	var BodyView = Backbone.View.extend({
		id: 'body',

		tagName: 'div',

		views: {},

		batchViews: {},

		mode: 'browse',

		attributes:{"class": "row-fluid"},

		template: _.template(Template.replace(/(\r\n|\n|\r)/gm,"")),//'<div id="sidebar" class="well span2"></div><div id="content" class="row-fluid span10"><div class="span12 header" id="header"><h1>Screenshots</h1><div class="row-fluid"><h3 id="count" class="pull-right"></h3><h3 id="date" class="pull-right">date</h3></div></div></div>'),

		events: {
			"click .filter": "filterAndDraw",
			"click #mode" : "switchMode",
			"mousedown .ui-slider-handle": "slider",
		},

		// initialize: function(batch){
		// 	this.initialBatch = batch || {};
		// 	this.batchModel = new BatchModel(batch);
		// },

		
		render: function(batch){
			console.log('begin render');
			this.$el.html(this.template());
			$('#container').html(this.$el);
			this.renderSlider();
			this.renderSidebar(batch);
			var batchView = new BatchView({collection: batch, mode: 'browse'});
			this.drawContent(batchView);
			return this;
		},

		renderSidebar: function(batch){
			if (this.views['sidebar'] != undefined){
				this.views['sidebar'].remove();
				var sidebarView = new SidebarView({collection: batch});
			} else{
				var sidebarView = new SidebarView({collection: this.initialBatch});
			}
			this.views['sidebar'] = sidebarView;
			$("#sidebar").append(this.views['sidebar'].el);
		},

		renderSlider: function(){
			if(this.views['slider'] != undefined){
				this.views['slider'].remove();
			}
			var sliderView = new SliderView();
			//adds values to the SliderView
			var batchIds = new BatchIdsModel(sliderView);
			this.views['slider'] = sliderView.render();
			$("#header").append(this.views['slider'].render().el);
		},	 

		drawContent: function(contentView){
			if(this.views['content'] != undefined){
				this.views['content'].remove();
			}
			this.views['content'] = contentView;
			$("#content").append(this.views['content'].el);

		},


		filterAndDraw: function(ev){
			//used to filter the screenshots
			//logic for keeping track of which butons are clicked.
			var workingBatch = this.initialBatch;
			console.log('workingBatch', workingBatch)
			console.log('EEEVVV', ev);
			var target = $("#"+ev.target.id);
			//buttons that are active before the click
			var isActive = ($("#"+ev.target.id).hasClass('btn-primary'));
			var mostRecentlyClicked = ev.target.text;
			var activeBrowsers = {};
			var activeButtons = $("#sidebar .btn-primary");
			
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
			var filteredCollection = new BatchCollection(filtered);
			var batchView = new BatchView({collection: filteredCollection, mode: this.mode});
			this.drawContent(batchView);
		},

		switchMode: function(ev){
			if(this.mode == 'compact'){
				this.mode = 'browse';
				$("#mode").html('Switch to Compact Mode');
				this.filterAndDraw(ev);
			} else if(this.mode=='browse'){
				this.mode = 'compact';
				$("#mode").html('Switch to Browse Mode');
				this.filterAndDraw(ev);
			}
		},

		slider: function(){
			var self = this;
			$("#slider").slider({
				slide: function(event, ui){
					var value = $("#slider").slider("value");
					var hashDate = self.views['slider'].values[ui.value];
					console.log(hashDate);
					$("#date").html(self.hashToDateString(hashDate));
				},

				//this will be called when the slider stops sliding... load the pictures
				stop: function(event, ui){
					var value = $("#slider").slider("value");
					var hashDate = self.views['slider'].values[ui.value];

					//if self.batchViews already contains the batchView of hashdate
					//set the current content view to be the proper batchView
					if(self.batchViews.hasOwnProperty(hashDate)){
						if(self.mode == 'browse'){
							self.views['content'].remove();
							self.views['content'] = self.batchViews[hashDate];
						}
						self.initialBatch = self.batchViews[hashDate].collection;
						self.filterAndDraw(event);
					} else{
						console.log('not found in hash');
						var batch = new BatchCollection({batchId: hashDate});
						batch.fetch({
							error: function(collection, response){
								console.log('error getting new batch: ', response);
							},

							success: function(collection, response){
								console.log('success');
								var mode = self.views['content'].mode;
								console.log('MODE!!!!!', mode);
								var batchView = new BatchView({collection: collection, mode: mode});
								if (self.views['content'] != undefined){
									self.views['content'].remove();
								}
								self.batchViews[hashDate] = batchView;
								self.views['content'] = batchView;
								self.initialBatch = batch;
								console.log(self.views['content']);
								self.renderSidebar(collection);
								self.filterAndDraw(event);
								// $("#content").append(self.views['content'].el);	
							}//end success
						});//end fetch
					}//end else
				},//end stop
			});//end $("#slider").slider()
		},//end slider


		hashToDateString: function(hashString){
			// var hashString = $("#date").html();
			var hash = parseInt(hashString);
			var year = Math.floor(hash/100000);
			hash = hash-year*100000;
			var month = Math.floor(hash/1000);
			hash = hash-month*1000;
			var date = Math.floor(hash/10);
			hash = hash-date*10;
			var time;
			if(hash == 5){
				time = 'Evening';
			} else{
				time = 'Morning';
			}
			var out = parseInt(month) +"/"+parseInt(date)+"/"+parseInt(year)+ " " + time;
			$("#date").html(out);
			return out;
		},

		// if this is needed, the correct function is in mongo-helper
		// dateHash: function(javascriptDateObject){
		// 	var date = d.getDate();
		// 	var month = d.getMonth();
		// 	var year = d.getFullYear();

		// 	//properly format month and date for database use:
		// 	if(month <10){	month = "0"+month;	}
		// 	if(date < 10){	date = "0"+date;	}

		// 	var batchIdString = month + date + year;

		// 	//adds 0 at the end if it is the morning batch, 5 if it is the afternoon batch
		// 	if(d.getHours()<=12) {
		// 		batchIdString = batchIdString.concat('0');
		// 	}
		// 	else{
		// 		batchIdString = batchIdString.concat('5');
		// 	}
		// 	return batchIdString;
		// }

	});

	return BodyView;
});
