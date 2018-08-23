const $ = require('jquery')

$('button').click(function () {
    $.get($(this).text(), function (a) {
        $('#data').html(a)
    })
})