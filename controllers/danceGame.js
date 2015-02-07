/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');

exports.successorFunction = function (node) {
    "use strict";
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
    //children.sort(comparator);
    return children;
};

exports.evaluate = function (node) {
    "use strict";
    if (nodeFactory.isMaxNode(node)) {
        return -Infinity;
    }
    return Infinity;
};

var heuristic1 = function (state, move) {
    "use strict";
    // rows with more closed moves score lower
    var row, score;
    row = move[1];
    score = 0;
    state[row].map(function (x) {
        score = x ? score : score  + 1;
    });
    return score;
};

var comparator = function (a, b) {
    "use strict";
    var aScore, bScore, aCache, bCache;
    aCache = nodeFactory.checkCache(a);
    bCache = nodeFactory.checkCache(b);
    if (aCache && !bCache) { return 1; }
    if (bCache && !aCache) { return -1; }
    //aScore = heuristic1(a.state, a.nextMove);
    //bScore = heuristic1(b.state, b.nextMove);
    //if (aScore > bScore) { return -1; }
    //return 1;
    return 0;
};