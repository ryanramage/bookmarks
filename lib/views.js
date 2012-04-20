

exports.by_date = {
    map : function(doc) {

        

        if (doc.type && doc.type === 'com.eckoit.bookmark' ) {
            var timestamp = doc.timestamp;
            if (!timestamp) timestamp = new Date(0);
            emit(timestamp, null);
        }
    }
}

exports.by_views = {
    map : function(doc) {
        if (doc.type && doc.type === 'com.eckoit.bookmark' ) {
            var clicks = doc.clicks;
            if (!clicks) clicks = 0;

            var timestamp = doc.timestamp;
            if (!timestamp) timestamp = new Date(0);

            emit([clicks, timestamp], null);
        }
    }
}

