$(function(){

    function returnToUrl(url) {
        window.location = url;
    }


    var createHash = function(text) {
       return text.toLowerCase().replace(/ /g, '_');
    }


    $('#topicTags').chosen({no_results_text: "No results matched", create_option : function(terms){

        var me = this;

        var hash = terms.toLowerCase().replace(/ /g, '_');

        var tag = {
            type : 'garden.tag',
            name : terms,
            hash : hash
        };
        $.ajax({
              url :  './_db' ,
              type: 'POST',
              contentType : 'application/json',
              data : JSON.stringify(tag),
              success : function(result) {
                  return me.select_append_option({
                    value: terms,
                    text: terms
                  });
              },
              error : function() {
                  console.log('error');
              }
        });


    }});


    $('form').on('submit', function() {

        try {
            $.ajax({
                  url :  './save?title=' + $('#bookmarkTitle').val() + '&url=' + $('#bookmarkUrl').val() ,
                  type: 'POST',
                  data : 'short_text=' + $('#bookmarkShortText').val(),
                  success : function(result) {
                      returnToUrl($('#bookmarkUrl').val());
                  },
                  error : function() {
                      console.log('error');
                  }
            });
        } catch(ignore){}


        return false;
    })

});