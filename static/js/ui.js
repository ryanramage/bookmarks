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

    function render_data(data) {
        $('.bookmarks').empty();
        _.each(data.rows, function(row) {
            var random = Math.floor(Math.random()*10000);
            row.doc.random = random;
            $('.bookmarks').append(handlebars.templates['bookmark_row.html'](row.doc, {}));
            $('img.site-image').error(function() {
                 $(this).attr('src', 'static/img/ark2.png');
            });
        });
    }

    function activate_tab(tab) {
        $('ul.topicFilter li').removeClass('active');
        $('ul.topicFilter li.' + tab).addClass('active');
    }


    function recent() {
        if (checkLastRoute('recent')) return;
        activate_tab('recent');
        db.getView('bookmarks', 'by_date', {include_docs:true, descending: true, random : Math.floor(Math.random()*10000) }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data);
        });
    }
    function to_review() {
        if (checkLastRoute('to-review')) return;
        activate_tab('to-review');
        db.getView('bookmarks', 'by_views', {include_docs:true, descending: true, endkey : [0], startkey: [0, {}], random : Math.floor(Math.random()*10000) }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data);
        });
    }

    function views() {
        if (checkLastRoute('view')) return;
        activate_tab('view');
        db.getView('bookmarks', 'by_views', {include_docs:true, descending: true, endkey : [1, {}], startkey: [Number.MAX_VALUE, {}], random : Math.floor(Math.random()*10000)  }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data);
        });
    }

    var last_route = null;
    function checkLastRoute(route) {
        if (last_route == route) return true;
        last_route = route;
        return false;
    }

    var routes = {
      '/recent' : recent,
      '/to_review' : to_review,
      '/views'   : views
    };
    var router = Router(routes);
    router.init('/recent');



});