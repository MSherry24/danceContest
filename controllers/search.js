/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var danceGame = require('./danceGame');

/*=================================================================
 * minimax
 * Input:   node - A node object
 *          alpha - the current alpha value
 *          beta - the current beta value
 * Runs the minimax algorithm recursively, pruning off branches where
 * alpha and beta have deviated until the search space has been
 * examined and a solution is found.
 ===================================================================*/

//exports.minimaxABPruningAndStateCache = function (node, alpha, beta) {
//    "use strict";
//    var result, cacheValue;
//    node.children = danceGame.successorFunction(node);
//    // If the node has no children, it is a leaf and should be evaluated
//    if (nodeFactory.isLeaf(node)) {
//        console.log('evaluating id #' + node.id);
//        result = { value: danceGame.evaluate(node), id: node.id };
//        nodeFactory.addToCache(node, result.value, node.id);
//        return result;
//    }
//    // If it's a max node, find the max value child
//    if (nodeFactory.isMaxNode(node)) {
//        while (node.children.length > 0) {
//            cacheValue = nodeFactory.checkCache(node);
//            if (cacheValue !== undefined) { return cacheValue; }
//            result = this.minimaxABPruningAndStateCache(node.children.pop(), alpha, beta);
//            if (result.value >= beta.value) {
//                beta.id = beta.id === '' ? result.id : beta.id;
//                nodeFactory.addToCache(node, beta.value, beta.id);
//                console.log('pruned #' + node.id + ' at depth ' + node.depth);
//                nodeFactory.addPruned(node.children.length);
//                return beta;
//            }
//            if (result.value > alpha.value) { alpha = result; }
//        }
//        nodeFactory.addToCache(node, alpha.value, alpha.id);
//        return alpha;
//    }
//    // if it's a min node, find the min value child
//    if (nodeFactory.isMinNode(node)) {
//        while (node.children.length > 0) {
//            cacheValue = nodeFactory.checkCache(node);
//            if (cacheValue !== undefined) { return cacheValue; }
//            result = this.minimaxABPruningAndStateCache(node.children.pop(), alpha, beta);
//            if (result.value <= alpha.value) {
//                alpha.id = alpha.id === '' ? result.id : alpha.id;
//                nodeFactory.addToCache(node, alpha.value, alpha.id);
//                console.log('pruned #' + node.id + ' at depth ' + node.depth);
//                nodeFactory.addPruned(node.children.length);
//                return alpha;
//            }
//            if (result.value < beta.value) { beta = result; }
//        }
//        nodeFactory.addToCache(node, beta.value, beta.id);
//        return beta;
//    }
//};

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

var setUpNewRun = function (nextMoveNode) {
    "use strict";
    var newRoot;
    nodeFactory.reset();
    newRoot = nodeFactory.createNode('root', nextMoveNode.nextMove);
    newRoot.state = nodeFactory.deepCopy(nextMoveNode.state);
    return newRoot;
};

exports.run = function (rootNode, movesTaken) {
    "use strict";
    var minimaxResults, solutionPathResults, nextMoveNode, whoseTurn, self;
    // for whoseTurn: true = my turn, false = opponent's turn
    whoseTurn = true;  // It is always my turn at the start of the game
    nextMoveNode = rootNode;
    while (danceGame.successorFunction(nextMoveNode).length > 0) {
        minimaxResults = this.minimaxABPruning(nextMoveNode, {value: -Infinity, id: ''}, {value: Infinity, id: ''});
        nextMoveNode = nodeFactory.getNextMove(minimaxResults.id);
        movesTaken.push(nextMoveNode.nextMove);
        nextMoveNode = setUpNewRun(nextMoveNode);
        whoseTurn = !whoseTurn; // Turn ends, opponent takes next turn.
    }
    // if whoseturn is true when the loop ends, it's my turn and there are no more moves, so I lose
    // otherwise, it's my opponents turn and there are no moves, so I win
    solutionPathResults = {
        movesTaken: movesTaken,
        whoWon: whoseTurn ? 'Opponent Won' : 'You Win'
    };
    return solutionPathResults;
};

