/**
 * Created by Mike on 1/30/2015.
 */

var run = function () {
    $.post('/');
};

$(document).ready(function () {
    $("#runButton").on('click', run);
});