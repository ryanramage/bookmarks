var templates = require('handlebars').templates;



exports.bookmark = function(head, req) {

    start({'headers' : {'Content-Type' : 'text/html'}});
    var row;
    var tags = [];
    while (row = getRow()) {
        tags.push(row.key);
    }
    send(templates['newBookmarkFull.html']({
        title : req.query.title,
        url  : req.query.url,
        tags : tags
    }));
}

exports.bookmark_lite = function(head, req) {
    start({'headers' : {'Content-Type' : 'text/html'}});
    var row;
    var tags = [];
    while (row = getRow()) {
        tags.push(row.key);
    }
    send(templates['newBookmark.html']({
        title : req.query.title,
        url  : req.query.url,
        tags : tags
    }));
}