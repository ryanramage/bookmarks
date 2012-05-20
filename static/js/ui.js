var handlebars = require('handlebars');
var db = require('db').use('_db');
var _ = require('underscore')._;

$(function() {

    $('#myModal').modal();
    $('#myModal').modal('hide');

    $('.help').tooltip({placement: 'bottom', delay: { show: 1000, hide: 100 }});

    var location = window.location;
    var bookmarklet = location.protocol + '//' + location.host + location.pathname;
    $('.bookmark').html(handlebars.templates['bookmark.html']({location : bookmarklet}, {}));



    $('.row.topic').live('mouseenter', function(){
        $(this).find('.actions').show();
    }).live('mouseleave', function() {
        $(this).find('.actions').hide();
    });



    tags_and_counts();

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


    $('img.local').live({
            mouseenter: function() {
                var docElm = $(this)[0];
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
            },
            mouseleave: function() {

            }
    })


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

    function render_data(data, empty_msg) {
        if (!empty_msg) empty_msg = "No bookmarks here";
        $('.bookmarks').empty();

        if (data.rows.length == 0) {
            $('.bookmarks').append(handlebars.templates['no_results.html']({msg : empty_msg}, {}));
            return;
        }
        _.each(data.rows, function(row) {
            var random = Math.floor(Math.random()*10000);
            row.doc.random = random;

            var screenshot = null;
            if (row.doc._attachments && row.doc._attachments['screenshot_small.png']) { screenshot = 'screenshot_small'}
            else if (row.doc._attachments && row.doc._attachments['screenshot.png']) { screenshot = 'screenshot'}

            row.doc.screenshot = screenshot;

            $('.bookmarks').append(handlebars.templates['bookmark_row.html'](row.doc, {}));
            $('img.site-image').error(function() {
                 $(this).attr('src', 'static/img/ark2.png');
            });
        });
    }

    function render_tags(data) {
        $('.tags-all').html(handlebars.templates['tags-all.html']({rows : data.rows}, {}));
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
        db.getView('bookmarks', 'by_views', {include_docs:true, descending: false, startkey : [0], endkey: [0, {}], random : Math.floor(Math.random()*10000) }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data, "Woohoo! You've read all your bookmarks. ");
        });
    }

    function views() {
        if (checkLastRoute('view')) return;
        activate_tab('view');
        db.getView('bookmarks', 'by_views', {include_docs:true, descending: true, endkey : [1], startkey: [Number.MAX_VALUE, {}], random : Math.floor(Math.random()*10000)  }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data);
        });
    }

    function tagged_recent(tag) {
        if (checkLastRoute('tagged_recent_' + tag)) return;
        activate_tab('recent');
        db.getView('bookmarks', 'by_tag', {include_docs:true, descending: true, random : Math.floor(Math.random()*10000), startkey: [tag, Number.MAX_VALUE], endkey: [tag], reduce: false }, function(err, data) {
            if (err) return humane.error(err);
            render_data(data);
        });
    }


    function tagged_to_review(tag) {

    }

    function tagged_views(tag) {

    }

    function tags_and_counts () {
        $.getJSON('./all_tag_count', function(data) {
            render_tags(data);
        })

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
      '/views'   : views,
      '/tagged/:tag/recent' : tagged_recent,
      '/tagged/:tag/to_review' : tagged_to_review,
      '/tagged/:tag/views' : tagged_views,
      '/tagged/:tag' : tagged_recent
    };
    var router = Router(routes);
    router.init('/to_review');



});