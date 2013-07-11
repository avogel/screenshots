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
        }
    },
    paths: {
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'jquery': 'lib/jquery'
    }
})

requirejs(['collections/batch', 'models/screenshot', 'views/batch', 'views/screenshot', 'views/sidebar', 'views/body' ],
function(BatchCollection, ScreenshotModel, BatchView, ScreenshotView, SidebarView, BodyView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "home" : "home",
        },

        // initialize: function(){
            
        // },

        home: function(){
            var batch = new BatchCollection();
            var body = new BodyView();
            batch.fetch({
                error: function(collection, response){
                    console.log('error', response);
                },

                success: function(collection, response){
                    //console.log(collection);
                    for(var r = 0, l = response.length; r<l; r++){
                        var m = new ScreenshotModel(response[r]);
                        batch.add(m);
                    }
                    body['initialBatch'] = batch
                    body.render(batch);
                }
            });
            
            
        }
    });
    app = new AppRouter();
    Backbone.history.start();
});