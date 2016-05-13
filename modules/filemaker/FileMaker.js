
function FileMaker() {
	this.fms = require('../fms/index');
	this.promise = require('promise');

	this.connection = this.fms.connection({
		url: process.env.FM_HOST,
		userName: process.env.FM_USER,
		password: process.env.FM_PASS
	});
}

FileMaker.prototype.getDBNames = function() {

	console.log('get all databases');
	var connection = this.connection;
	return new this.promise(function(resolve, reject) {
		connection.dbnames().send(function(err, result) {

			console.log('success: ', result, 'error: ', err);
			if(err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

FileMaker.prototype.getDBLayouts = function() {

	console.log('get all layouts');
	var db = this.connection.db(process.env.FM_DATABASE_NAME);
	return new this.promise(function(resolve, reject) {
		db.layoutnames().send(function(err, result){

			console.log('success: ', result, 'error: ', err);
			if (err) {
				return reject(err);
			} else {
				return resolve(result);
			}
		});
	});
};

FileMaker.prototype.queryRecords = function(layout) {

	var connection = this.connection;
	return new this.promise(function(resolve, reject) {
		connection
		.db(process.env.FM_DATABASE_NAME)
		.layout(layout)
		.query({
			'-max' : 10,
			'-findall' : '',
			'-sortfield.1' : 'Field Name',
			'-sortorder.1' : 'descend'
		})
		.send(function(err, result) {

			console.log('layout: ', layout, 'success: ', result, 'error: ', err);
			if (err) {
				return reject(err);
			} else {
				return resolve(result);
			}
		});
	});
};

module.exports = FileMaker;