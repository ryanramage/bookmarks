
var md5 = require('md5');
var querystring = require('querystring');

exports.bookmark = function(doc, req) {

    var details = {};
    if (req.body && req.body.length > 0) {
        details = querystring.parse(req.body);
    } else {
        details.title = req.query.title;
        details.url = req.query.url;
    }
    log(details);
    if (!doc) {
        var id = md5.hex(details.url);
        var doc = {
            _id : id,
            title : decodeURIComponent(details.title),
            url : decodeURIComponent(details.url),
            timestamp: new Date().getTime()
        };
        log(doc);
        return [doc, 'SUCCESS']

    } else {

    }
}