/**
 * Created by Mike on 1/30/2015.
 */

var run = function () {
    var input;
    input = $("#danceInput").val();
    $.post('/', { input: input }, function (res) {
        $('#results').prepend(res.result.value + " id = " + res.result.id + '<br>');
    });
};

$(document).ready(function () {
    $("#runButton").on('click', run);
});