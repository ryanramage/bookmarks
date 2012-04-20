$(function(){

    function returnToUrl(url) {
        window.location = url;
    }


    $('form').on('submit', function() {

        try {
            $.ajax({
                  url :  './save?title=' + $('#bookmarkTitle').val() + '&url=' + $('#bookmarkUrl').val(),
                  type: 'POST',
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