var request = require('superagent');
var xml2jsParser = require('superagent-xml2jsparser');
var dbNamesRequest = require('./dbNamesRequest');
var database = require('./database');
var config = require('../config');

var END_POINT = '/fmi/xml/fmresultset.xml'
// add proxy to superagent
require('superagent-proxy')(request);

/**
 * creates a FMS Connection
 * @param options
 * @returns {{post: Request, query: Function}}
 */
var connection = function (options) {

    var url = options.url;
    var protocol = options.protocol || 'http';
    var userName = options.userName;
    var password = options.password;

    if(config.proxy && config.proxy !== ''){
        console.log("Got proxy: " + config.proxy)
         var createPostRequest = function () {
            var post = request
                .post(protocol + '://' + url + END_POINT)
                .proxy(config.proxy)
                .auth(userName, password)
                .accept('xml')
                .parse(xml2jsParser);
            return post
        };

    } else {
        var createPostRequest = function () {
            var post = request
                .post(protocol + '://' + url + END_POINT)
                .auth(userName, password)
                .accept('xml')
                .parse(xml2jsParser);
            return post
        };

    }

    var db = function (name) {
        return database(createPostRequest, name)
    }

    return {
        dbnames : function(){return dbNamesRequest( createPostRequest() )},
        db : db
    }

}

module.exports = {
    connection : connection
}