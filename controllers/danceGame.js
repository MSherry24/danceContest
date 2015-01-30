/**
 * Created by Mike on 1/30/2015.
 */
var solutionTree = require('./solutionTree');
var nodeFactory = require('./nodeFactory');

exports.successorFunction = function (node, lastMove) {
    var currentState, children, i, newNode;
    children = [];
    currentState = solutionTree[node].state;
    for (i = 0; i < currentState[lastMove].length; i++) {
        if (currentState[lastMove][i] === false) {
            newNode = nodeFactory.createNode(node);
            newNode.state = solutionTree[parent].state;
            newNode.state[i][lastMove] = true;
            newNode.state[lastMove][i] = true;
            children.push(newNode);
        }
    }
    return children;
};