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
            "/testing" : "home"
        },

        initialize: function(){
            
        },

        home: function(){
            var batch = new BatchCollection();
            batch.fetch({
                error: function(collection, response){
                    console.log('error', response);
                }

                success: function(collection, response){
                    console.log('success', response);
                }
            })
            var batchView = new BatchView({collection: batch});
            // var screenshot = new ScreenshotModel({ 
            //     url: 'http://nytimes.com',
            //     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
            //     device: null,
            //     os: 'Windows',
            //     created_at: '2013-06-24 21:46:02 UTC',
            //     id: 'abc26cae747c04495537caf7f79654a606c67f4a',
            //     state: 'done',
            //     os_version: '7',
            //     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
            //     orientation: null,
            //     browser: 'ie',
            //     browser_version: '9.0' 
            // });
            // var screenshotView = new ScreenshotView({model: screenshot});
            //batch.add(screenshot);
            //batchView.render();
        }
    });
    utils.loadTemplate([],function(){
        app = new AppRouter();
        Backbone.history.start();
    })
    



    // var batch = new BatchCollection();
    // var batchView = new BatchView({collection: batch});
    // var screenshot = new ScreenshotModel({ 
    //     url: 'http://nytimes.com',
    //     image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
    //     device: null,
    //     os: 'Windows',
    //     created_at: '2013-06-24 21:46:02 UTC',
    //     id: 'abc26cae747c04495537caf7f79654a606c67f4a',
    //     state: 'done',
    //     os_version: '7',
    //     thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
    //     orientation: null,
    //     browser: 'ie',
    //     browser_version: '9.0' 
    // });
    // // var screenshotView = new ScreenshotView({model: screenshot});
    // batch.add(screenshot);
    // batchView.render();

});

