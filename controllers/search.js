/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var stateVariables = require('./stateVariables');
var danceGame = require('./danceGame');

/*=================================================================
 * minimax
 * Input:   node - A node object
 *          lastMove - An integer representing the last move made by an opponent
 * Runs the minimax algorithm recursively until the search space has been
 * examined and a solution is found.
 ===================================================================*/

exports.minimax = function (node) {
    "use strict";
    var maxValue, minValue, result, currentChild;
    node.children = danceGame.successorFunction(node);
    if (nodeFactory.isLeaf(node)) {
        return danceGame.evaluate(node);
    }
    if (nodeFactory.isMaxNode(node)) {
        maxValue = -Infinity;
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = this.minimax(currentChild);
            maxValue = result > maxValue ? result : maxValue;
        }
        return maxValue;
    }
    if (nodeFactory.isMinNode(node)) {
        minValue = -Infinity;
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = this.minimax(currentChild);
            minValue = result > minValue ? result : minValue;
        }
        return minValue;
    }
};