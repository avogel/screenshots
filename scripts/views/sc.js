define([
	'backbone',
	'underscore',
	'text!templates/compactScreenshot.html',
	'text!templates/browseScreenshot.html'
], function(Backbone, _, CompactScreenshotTemplate, BrowseScreenshotTemplate){
	var ScView = Backbone.View.extend({
		tagName: 'div',

		attributes: {},

		initialize: function(options){
			this.mode = options.mode;
			this.model = options.model;
			if(this.mode == 'browse'){
				this.$el.addClass('span6 marker');
			} else if(this.mode == 'compact'){
				this.$el.addClass('accordion-group');
			}
		},

		template: function(model){
			if(this.mode == 'compact'){
				return _.template(CompactScreenshotTemplate.replace(/(\r\n|\n|\r)/gm,""),model);
			} else if(this.mode == 'browse'){
				return _.template(BrowseScreenshotTemplate.replace(/(\r\n|\n|\r)/gm,""), model);
			}
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

	});
	return ScView;
})