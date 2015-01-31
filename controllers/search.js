/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
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
    // If the node has no children, it is a leaf and should be evaluated
    if (nodeFactory.isLeaf(node)) {
        return { value: danceGame.evaluate(node), id: node.id };
    }
    // If it's a max node, find the max value child
    if (nodeFactory.isMaxNode(node)) {
        maxValue = { value: 0, id: '' };
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = this.minimax(currentChild);
            if (maxValue.value === 0) { maxValue = result; }
            else {maxValue = result.value > maxValue.value ? result : maxValue; }
        }
        return maxValue;
    }
    // if it's a min node, find the min value child
    if (nodeFactory.isMinNode(node)) {
        minValue = { value: 0, id: '' };
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = this.minimax(currentChild);
            if (minValue.value === 0) { minValue = result; }
            else { minValue = result.value < minValue.value ? result : minValue; }
        }
        return minValue;
    }
};