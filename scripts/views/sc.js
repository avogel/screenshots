define([
	'backbone',
	'underscore'
], function(Backbone, _){
	var ScView = Backbone.View.extend({
		tagName: 'div',

		attributes: {},

		initialize: function(options){
			console.log('initialize sc', options);
			this.mode = options.mode;
			this.model = options.model;
			// alert('init');
			// alert(this.mode);
			console.log(this);
			if(this.mode == 'browse'){
				console.log('browse');
				this.$el.addClass('span6 marker');
			} else if(this.mode == 'compact'){
				// this.attributes['class'] = 'accordion-group';
				this.$el.addClass('accordion-group');
			}
			console.log('###########sc init##############');
			console.log(this);
		},

		template: function(model){
			console.log(this.mode);
			if(this.mode == 'compact'){
				return _.template('<div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" href="#<%= id %>collapse"><h4 class="screenshotTitle"><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></h4></a></div><div class="accordion-body collapse" id="<%=id%>collapse"><div class="accordion-inner"><img class="screenshot collapsable" src= <%= image_url%> ></div></div>', model);
			} else if(this.mode == 'browse'){
				return _.template('<h4 class="screenshotTitle"><%= browser %> version <%= browser_version %> running on <%= os %> <%= os_version %></h4><a href=<%= image_url%> ><img class="screenshot" src= <%= image_url%> ></a>', model);
			}
		},

		render: function(){
			// console.log(this.template(this.model.toJSON()));
			this.$el.html(this.template(this.model.toJSON()));
			// alert('render');
			return this;
		},

	});
	return ScView;
})