

exports.by_date = {
    map : function(doc) {
        if (doc.type && doc.type === 'com.eckoit.bookmark' ) {
            var timestamp = doc.timestamp;
            if (!timestamp) timestamp = new Date(0);
            emit(timestamp, null);
        }
    }
}

