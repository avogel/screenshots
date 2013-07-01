var cronJob = require('cron').CronJob;
var express = require('express');
var app = express();


// cronJob example.  Prints every second
var job = new cronJob({
	cronTime: '11 * * * * ',
	onTick: function(){
		console.log("cron print");
	},
	start: false,
	timeZone: "America/New_York"
});
job.start();


app.listen(3000);
console.log('listening on port 3000');