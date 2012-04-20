var handlebars = require('handlebars');
var db = require('db').use('_db');
var _ = require('underscore')._;

$(function() {

    $('#myModal').modal();
    $('#myModal').modal('hide');

    $('.help').tooltip({placement: 'bottom'});

    var location = window.location;
    $('.bookmark').html(handlebars.templates['bookmark.html']({location : location}, {}));



    $('.row.topic').live('mouseenter', function(){
        console.log('in');
        $(this).find('.actions').show();
    }).live('mouseleave', function() {
        $(this).find('.actions').hide();
    });


    $('.archive').live('click', function(){
        var me = $(this);
        var id = me.data("id");

        $.ajax({
              url :  './archive/' + id,
              type: 'PUT',
              success : function(result) {
                  var row = me.closest('.row.topic');
                  row.hide(500, function(){
                        row.remove();
                  });

              },
              error : function() {
                    console.log('rr');
              }
        });
        return false;
    });


    // our click tracker
    $('a.bookmark').live('click', function(){
        var id = $(this).data("id");
        var url= $(this).attr('href');
        $.ajax({
              url :  './click/' + id,
              type: 'PUT',
              success : function(result) {
                    window.location = url;
              },
              error : function() {
                    console.log('rr');
              }
        });
        return false;
    })

    db.getView('bookmarks', 'by_date', {include_docs:true, descending: true}, function(err, data) {
        if (err) return humane.error(err);
        _.each(data.rows, function(row) {
            var random = Math.floor(Math.random()*10000);
            row.doc.random = random;
            $('.bookmarks').append(handlebars.templates['bookmark_row.html'](row.doc, {}));
        })

    })



});