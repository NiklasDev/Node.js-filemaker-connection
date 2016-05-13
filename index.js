
require('dotenv').config();

var FileMaker = require('./modules/filemaker/FileMaker');
var filemaker = new FileMaker();

var express = require('express');
var app = express();

app.get('/getlayoutrecords', function(req, res) {

	console.log('get layout records: ', req.query.layout);
	filemaker.queryRecords(req.query.layout).then(function(result) {
		res.send(result);
	}, function(err) {
		res.send('Error');
	});
});

app.get('/getlayouts', function(req, res) {
	
	filemaker.getDBLayouts().then(function(result) {
		res.send(result);
	}, function(err) {
		res.send('Error');
	});
});

app.get('/getdatabases', function(req, res) {
	
	filemaker.getDBNames(req.query.layout).then(function(result) {
		res.send(result);
	}, function(err) {
		res.send('Error');
	});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});