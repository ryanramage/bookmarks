
var md5 = require('md5');
var querystring = require('querystring');
var _ = require('underscore')._;

function decodeWWWform(text) {
   return decodeURI(text.split('+').join(' '));
}


exports.bookmark = function(doc, req) {

    var details = {};
    if (req.body && req.body.length > 0) {
        details = querystring.parse(req.body);
        if (details.title)      details.title = decodeWWWform(details.title);
        if (details.url)        details.url = decodeWWWform(details.url);
        if (details.short_text) details.short_text = decodeWWWform(details.short_text);

    }
    if (req.query.title) details.title = req.query.title;
    if (req.query.url)   details.url = req.query.url;

    if (!doc) {
        var id = md5.hex(details.url);
        var doc = {
            _id : id,
            type: 'com.eckoit.bookmark',
            title : details.title,
            url : details.url,
            timestamp: new Date().getTime()
        };
        if (details.short_text) doc.short_text = details.short_text;
        if (_.isArray(details.tags))  doc.tags = details.tags;
        if (_.isString(details.tags)) doc.tags = [details.tags];

        if (details.screenshot) {
            doc._attachments = {
                "screenshot.png" : {
                    "content_type":"image\/png;base64",
                    "data" : details.screenshot
                }
            }
            if (details.screenshot_small) {
                doc._attachments['screenshot_small.png'] = {
                    "content_type":"image\/png;base64",
                    "data" : details.screenshot_small
                }
            }
        }


        return [doc, 'SUCCESS']

    } else {

    }
}

exports.click = function(doc, req) {
    if (!doc.clicks) doc.clicks = 0;
    doc.clicks++;
    return [doc, 'SUCCESS'];
}

exports.archive = function(doc, req) {
    doc.archive = true;
    return [doc, 'SUCCESS'];
}