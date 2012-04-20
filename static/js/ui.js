var handlebars = require('handlebars');

$(function() {

    var location = window.location;
    $('.bookmark').html(handlebars.templates['bookmark.html']({location : location}, {}));

});