var MongoHelper = require('../scripts/mongo-helper');

var testData = [{ 
        url: 'http://nytimes.com',
        image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
        device: null,
        os: 'Windows',
        created_at: '2013-06-24 21:46:02 UTC',
        id: 'abc26cae747c04495537caf7f79654a606c67f4a',
        state: 'done',
        os_version: '7',
        thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
        orientation: null,
        browser: 'firefox',
        browser_version: '21.0',
        batchId: '010120131'
},
{ 
        url: 'http://nytimes.com',
        batchId: '010120131',
        image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
        device: null,
        os: 'Windows',
        created_at: '2013-06-24 21:46:02 UTC',
        id: 'abc26cae747c04495537caf7f79654a606c67f4b',
        state: 'done',
        os_version: '7',
        thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
        orientation: null,
        browser: 'ie',
        browser_version: '9.0' 
},
{ 
        url: 'http://nytimes.com',
        batchId: '010120131',
        image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
        device: null,
        os: 'Windows',
        created_at: '2013-06-24 21:46:02 UTC',
        id: 'abc26cae747c04495537caf7f79654a606c67f4c',
        state: 'done',
        os_version: '7',
        thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
        orientation: null,
        browser: 'ie',
        browser_version: '9.0' 
},
{ 
        url: 'http://nytimes.com',
        batchId: '010120131',
        image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
        device: null,
        os: 'Windows',
        created_at: '2013-06-24 21:46:02 UTC',
        id: 'abc26cae747c04495537caf7f79654a606c67f4d',
        state: 'done',
        os_version: '7',
        thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
        orientation: null,
        browser: 'chrome',
        browser_version: '25.0' 
},
{ 
        url: 'http://nytimes.com',
        batchId: '010120131',
        image_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/win7_ie_9.0.jpg',
        device: null,
        os: 'Windows',
        created_at: '2013-06-24 21:46:02 UTC',
        id: 'abc26cae747c04495537caf7f79654a606c67f4e',
        state: 'done',
        os_version: '7',
        thumb_url: 'http://www.browserstack.com/screenshots/a3e0ed65a94592d9c5f32129ce77ba6c82ecbc96/thumb_win7_ie_9.0.jpg',
        orientation: null,
        browser: 'ie',
        browser_version: '9.0' 
}
];

var mongoHelper = new MongoHelper();
mongoHelper.addBatch(testData);
