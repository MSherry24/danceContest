/**
 * Created by Mike on 1/30/2015.
 */
var solutionTree = require('./solutionTree');

exports.runTest = function () {
    console.log('solution tree temp = ' + solutionTree.test);
    solutionTree.number2 = "Added this in temp";
    console.log('leaving temp');
};