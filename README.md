Screenshots:

The goal of this app is to take request batches of screenshots from browserstack (requests found in the requests.json file).  These responses are then stored and an interface for developers to look at these screenshots.  This is an outline of the general flow of the application:

server.js handles requests to the server and handles them in /scripts/routes/screenshots. Then the scripts/mongo-helper class will handle any interactions needed with the database, and send the respose is sent back to the user.

On the front end, scripts/main.js is the data-main that require points to.  The views are organized as such.  the body is the outermost view which will contain views for the sidebar, and the content.  The content, where the screenshots are rendered, is a batch view (bt.js right now).  A batch view is consisted of multiple screenshots (named sc.js).  There is also a slider view within the body which is placd above the batch. 
