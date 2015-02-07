/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var maxDepth = 6;

exports.successorFunction = function (node) {
    "use strict";
    var currentState, children, i, newNode, lastMove, currentMove;
    if (node.depth < maxDepth) {
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
    }
    return [];
};

exports.evaluate = function (node) {
    "use strict";
    // if there are no children before the max depth is reached,
    // the state is a true leaf and should be evaluated for a true
    // win or loss.
    if (node.depth < maxDepth) {
        if (nodeFactory.isMaxNode(node)) {
            return -Infinity;
        }
        return Infinity;
    }
    // Otherwise a heuristic function is used to estimate the node's
    // score.
    return heuristicScore(node);
};

var heuristicScore = function (node) {
    "use strict";
    var legalMovesLeft, i, j;
    legalMovesLeft = 0;
    i = 0;
    // Add up the number of legal moves left on the board (node.state[i][j] === false)
    node.state.map(function (row) {
        j = 0;
        row.map(function (element) {
            // if i < j, that move has already been counted once since the order of the moves
            // does not matter.
            if (!element && i >= j) {
                legalMovesLeft++;
            }
            j++;
        });
        i++;
    });
    // Give priority to boards with an odd number of legal moves left
    if (legalMovesLeft % 2 !== 0) {
        legalMovesLeft *= 10;
    }
    return legalMovesLeft;
};