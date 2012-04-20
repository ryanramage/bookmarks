

exports.all_tags = {
    map : function(doc) {
        if (doc.type && doc.type === 'tag' ) {
            emit(doc.hash, null);
        }
    },
    reduce : '_count'
}

