

exports.by_date = {
    map : function(doc) {

        if (doc.archive) return;

        if (doc.type && doc.type === 'com.eckoit.bookmark' ) {
            var timestamp = doc.timestamp;
            if (!timestamp) timestamp = new Date(0);
            emit(timestamp, null);
        }
    }
}

exports.by_views = {
    map : function(doc) {

        if (doc.archive) return;

        if (doc.type && doc.type === 'com.eckoit.bookmark' ) {
            var clicks = doc.clicks;
            if (!clicks) clicks = 0;

            var timestamp = doc.timestamp;
            if (!timestamp) timestamp = new Date(0);

            emit([clicks, timestamp], null);
        }
    }
}

exports.by_tag = {
    map : function(doc) {
        if (doc.archive) return;
        if (doc.type && doc.type === 'com.eckoit.bookmark' && doc.tags) {
           for (var i=0; i < doc.tags.length; i++) {
               var timestamp = doc.timestamp;
               if (!timestamp) timestamp = new Date(0);
               emit([doc.tags[i], timestamp], null);
           }
        }
    },
    reduce: '_count'
}

exports.by_tag_then_views = {
    map : function(doc) {
        if (doc.archive) return;
        if (doc.type && doc.type === 'com.eckoit.bookmark' && doc.tags) {
           for (var i=0; i < doc.tags.length; i++) {
                var clicks = doc.clicks;
                if (!clicks) clicks = 0;
                var timestamp = doc.timestamp;
                if (!timestamp) timestamp = new Date(0);
                emit([doc.tags[i], clicks, timestamp], null);
           }
        }
    }
}




exports.all_tags = {
    map : function(doc) {
        if (doc.type && doc.type == 'garden.tag') {
            emit(doc.hash, null);
        }
    }
}
