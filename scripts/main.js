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

requirejs(['collections/batch', 'models/screenshot', 'views/batch', 'views/screenshot' ],
function(BatchCollection, ScreenshotModel, BatchView, ScreenshotView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "testing" : "home"
        },

        // initialize: function(){
            
        // },

        home: function(){
            var batch = new BatchCollection();
            batch.fetch({
                error: function(collection, response){
                    console.log('error', response);
                },

                success: function(collection, response){
                    for(var r = 0, l = response.length; r<l; r++){
                        var m = new ScreenshotModel(response[r]);
                        batch.add(m);
                    }
                    var bv = new BatchView({collection: batch});
                }
            });
            
        }
    });
    app = new AppRouter();
    Backbone.history.start();
});