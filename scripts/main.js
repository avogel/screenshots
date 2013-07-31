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

    $.get(
        "/batchIds",
        function(data){
            var global = this;
            global.ids = data;

            var AppRouter = Backbone.Router.extend({
                self: this,

                routes: {
                    "": "compact",
                    "home" : "home",
                    "compact": "compact"
                },

                
                home: function(){
                    var batchId = global.ids[global.ids.length-1];
                    var batch = new BatchCollection({batchId: batchId});
                    var body = new BodyView();
                    batch.fetch({
                        error: function(collection, response){
                            console.log('error', response);
                        },

                        success: function(collection, response){
                            body.batchViews[batchId] = new BatchView({collection: batch});
                            body.initialBatch = collection;
                            body.render(collection);
                            $("#date").html(body.hashToDateString((batchId)));
                        },
                    });
                },

                compact: function(){
                    var batch = new BatchCollection();
                    var batchId = global.ids[global.ids.length-1];

                    batch.fetch({
                        error: function(collection, response){
                            console.log('error', response);
                        },

                        success: function(collection, response){
                            var body = new BodyView();
                            body.initialBatch = collection;
                            body.render(collection);
                            $("#date").html(body.hashToDateString((batchId)));

                        }
                    });
    
                }
            });

            app = new AppRouter();

            Backbone.history.start();
        }
    );
});