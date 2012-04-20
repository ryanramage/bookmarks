var templates = require('handlebars').templates;

exports.bookmark_lite = function(doc, req) {

    return {
        code: 200,
        headers: {'content-type' : 'text/html'},
        body: templates['newBookmark.html']({
            title : req.query.title,
            url  : req.query.url
        })
    };

}

exports.bookmark = function(doc, req) {
    return {
        code: 200,
        headers: {'content-type' : 'text/html'},
        body: templates['newBookmarkFull.html']({
            title : req.query.title,
            url  : req.query.url
        })
    };
}

