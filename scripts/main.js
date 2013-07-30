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
                routes: {
                    "home" : "home",
                    "compact": "compact"
                },

                

                home: function(){
                    var batchId = global.ids[global.ids.length-1];
                    console.log(String(batchId));
                    console.log('pre first collection');
                    var batch = new BatchCollection({batchId: batchId});
                    console.log('second batch created');
                    var body = new BodyView();
                    console.log('end of body init');
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
                    console.log('batch')
                    console.log(batch); 
                },

                compact: function(){
                    var batch = new BatchCollection();

                    batch.fetch({
                        error: function(collection, response){
                            console.log('error', response);
                        },

                        success: function(collection, response){
                            var body = new BodyView();
                            body.initialBatch = collection;
                            body.render(collection);
                            body.renderCompact(collection);
                        }
                    });  
                }
            });

            app = new AppRouter();
            $("#mode").click(function(){
                app.navigate('compact', {trigger: true});
            });
            Backbone.history.start();
        }
    );
});