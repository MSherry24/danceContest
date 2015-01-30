/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var solutionTree = require('./solutionTree');

exports.minimax = function (node) {
    "use strict";
    var maxValue, minValue, result, currentChild;
    if (nodeFactory.isLeaf(node)) {
        return evaluate(node);
    }
    if (nodeFactory.isMaxNode(node)) {
        maxValue = -Infinity;
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = minimax(solutionTree.tree[currentChild]);
            maxValue = result > maxValue ? result : maxValue;
        }
        return maxValue;
    }
    if (nodeFactory.isMinNode(node)) {
        minValue = -Infinity;
        while (node.children.length > 0) {
            currentChild = node.children.pop();
            result = minimax(solutionTree.tree[currentChild]);
            minValue = result > minValue ? result : minValue;
        }
        return minValue;
    }
};