
var md5 = require('md5');
var querystring = require('querystring');

exports.bookmark = function(doc, req) {

    var details = {};
    if (req.body && req.body.length > 0) {
        details = querystring.parse(req.body);
    }
    if (req.query.title) details.title = req.query.title;
    if (req.query.url)   details.url = req.query.url;

    if (!doc) {
        var id = md5.hex(details.url);
        var doc = {
            _id : id,
            type: 'com.eckoit.bookmark',
            title : decodeURIComponent(details.title),
            url : decodeURIComponent(details.url),
            timestamp: new Date().getTime()
        };
        if (details.short_text) doc.short_text = details.short_text;
        log(doc);
        return [doc, 'SUCCESS']

    } else {

    }
}

exports.click = function(doc, req) {
    if (!doc.clicks) doc.clicks = 0;
    doc.clicks++;
    return [doc, 'SUCCESS'];
}