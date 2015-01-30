/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var search = require('./search');

var parseInput = function (inputString) {
    var inputStringTokens, numberOfPossibleMoves, movesTaken, i;
    movesTaken = [];
    inputStringTokens = inputString.split('\r\n');
    numberOfPossibleMoves = Number(inputStringTokens[0]);
    for (i = 2; i < inputStringTokens.length; i++) {
        currentMoveTokens = inputStringTokens[i].split(' ');
        movesTaken.push([Number(currentMoveTokens[0]), Number(currentMoveTokens[1])]);
    }
    return {
        movesTaken: movesTaken,
        numberOfPossibleMoves: numberOfPossibleMoves
    };
};

exports.run = function (req, res) {
    "use strict";
    var rootNode, input, initialState, i, j;
    // read in inputs
    input = parseInput(req.body.input);
    // create initial state
    initialState = new Array(input.numberOfPossibleMoves);
    for (i = 0; i < input.numberOfPossibleMoves; i++) {
        initialState[i] = new Array(input.numberOfPossibleMoves);
        for (j = 0; j < input.numberOfPossibleMoves; j++) {
            initialState[i][j] = false;
        }
    }
    // mark off moves
    input.movesTaken.map(function (move) {
        initialState[move[0]][move[1]] = true;
        initialState[move[1]][move[0]] = true;
    });
    // create root node
    rootNode = nodeFactory.createNode('root');
    // initialize root node state
    rootNode.state = initialState;
    // call minimax run
    search.minimax(rootNode);
};