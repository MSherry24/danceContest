/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');

exports.successorFunction = function (node) {
    var currentState, children, i, newNode, lastMove, currentMove;
    lastMove = node.nextMove[1];
    children = [];
    currentState = node.state;
    for (i = 0; i < currentState[lastMove].length; i++) {
        if (currentState[lastMove][i] === false) {
            currentMove = [lastMove, i];
            newNode = nodeFactory.createNode(node, currentMove);
            children.push(newNode);
        }
    }
    return children;
};

exports.evaluate = function (node) {
    "use strict";
    if (nodeFactory.isMaxNode(node)) {
        return -Infinity;
    }
    return Infinity;
};