requirejs.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],

            exports: 'Backbone'
        },
        'underscore' : {
            exports: '_'
        },
        'jquery': {
            exports: 'jquery'
        },
    },
    paths: {
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'jquery': 'lib/jquery',
        'jqueryui': 'lib/jqueryui'
    }
});

requirejs(['collections/batch', 'models/screenshot', 'views/batch', 'views/screenshot', 'views/sidebar', 'views/body' ],
function(BatchCollection, ScreenshotModel, BatchView, ScreenshotView, SidebarView, BodyView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "home" : "home",
            "compact": "compact"
        },

        

        home: function(){
            var batch = new BatchCollection();
            batch.fetch({
                error: function(collection, response){
                    console.log('error', response);
                },

                success: function(collection, response){
                    var body = new BodyView(collection);
                    body.render(collection);
                }
            });  
        },

        compact: function(){
            var batch = new BatchCollection();

            batch.fetch({
                error: function(collection, response){
                    console.log('error', response);
                },

                success: function(collection, response){
                    var body = new BodyView(collection);
                    body.render(collection);
                    body.renderCompact(collection);
                }
            });  
        }
    });
    
    app = new AppRouter();

    $("#mode").click(function(){
        console.log('test');
        app.navigate('compact', {trigger: true});
    });
    Backbone.history.start();
});