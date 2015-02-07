/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var danceGame = require('./danceGame');

var setUpNewRun = function (nextMoveNode) {
    "use strict";
    var newRoot;
    nodeFactory.reset();
    newRoot = nodeFactory.createNode('root', nextMoveNode.nextMove);
    newRoot.state = nodeFactory.deepCopy(nextMoveNode.state);
    return newRoot;
};

exports.searchHelper = function (rootNode, movesTaken) {
    "use strict";
    var minimaxResults, solutionPathResults, nextMoveNode;
    // for whoseTurn: true = my turn, false = opponent's turn
    nextMoveNode = rootNode;
    while (danceGame.successorFunction(nextMoveNode).length > 0) {
        minimaxResults = this.minimaxABPruning(nextMoveNode, {value: -Infinity, id: ''}, {value: Infinity, id: ''});
        nextMoveNode = nodeFactory.getNextMove(minimaxResults.id);
        movesTaken.push(nextMoveNode.nextMove);
        nextMoveNode = setUpNewRun(nextMoveNode);
    }
    // since you always take the first move in the input, if there is an odd number of moves, you took the final move
    // so you win, if there is an even number of moves, your opponent wins.
    solutionPathResults = {
        movesTaken: movesTaken,
        whoWon: movesTaken.length % 2 === 0 ? 'Opponent Won' : 'You Won'
    };
    return solutionPathResults;
};

exports.minimaxABPruning = function (node, alpha, beta) {
    "use strict";
    var result;
    node.children = danceGame.successorFunction(node);
    // If the node has no children, it is a leaf and should be evaluated
    if (nodeFactory.isLeaf(node)) {
        console.log('evaluating id #' + node.id);
        return { value: danceGame.evaluate(node), id: node.id };
    }
    // If it's a max node, find the max value child
    if (nodeFactory.isMaxNode(node)) {
        while (node.children.length > 0) {
            result = this.minimaxABPruning(node.children.pop(), alpha, beta);
            if (result.value >= beta.value) {
                beta.id = beta.id === '' ? result.id : beta.id;
                return beta;
            }
            if (result.value > alpha.value) { alpha = result; }
        }
        return alpha;
    }
    // if it's a min node, find the min value child
    if (nodeFactory.isMinNode(node)) {
        while (node.children.length > 0) {
            result = this.minimaxABPruning(node.children.pop(), alpha, beta);
            if (result.value <= alpha.value) {
                alpha.id = alpha.id === '' ? result.id : alpha.id;
                return alpha;
            }
            if (result.value < beta.value) { beta = result; }
        }
        return beta;
    }
};