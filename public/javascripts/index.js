/**
 * Created by Mike on 1/30/2015.
 */

var run = function () {
    var input, trace;
    trace = '';
    input = $("#danceInput").val();
    $.post('/', { input: input }, function (res) {
        $('#results').html(res.whoWon);
        res.movesTaken.map(function (step) {
            trace += step + '<br>';
        });
        $('#trace').html(trace);
    });
};

$(document).ready(function () {
    $("#runButton").on('click', run);
});