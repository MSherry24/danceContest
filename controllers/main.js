/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var stateVariables = require('./stateVariables');
var search = require('./search');

/*=================================================================
 * parseInput
 * Takes the input text from the user.
 * Parses out the number of dance moves available, and
 * creates a list of already used dance move combinations,
 * returns both pieces of information in an object.
 ===================================================================*/
var parseInput = function (inputString) {
    var inputStringTokens, numberOfPossibleMoves, movesTaken, i;
    movesTaken = [];
    inputStringTokens = inputString.split('\n');
    // The first token will be the total number of moves available in this
    // run of the game
    numberOfPossibleMoves = Number(inputStringTokens[0]);
    // creats an array of two element arrays representing the move combinations
    // that have already been used
    for (i = 2; i < inputStringTokens.length; i++) {
        currentMoveTokens = inputStringTokens[i].split(' ');
        movesTaken.push([Number(currentMoveTokens[0]), Number(currentMoveTokens[1])]);
    }
    return {
        movesTaken: movesTaken,
        numberOfPossibleMoves: numberOfPossibleMoves
    };
};

/*=================================================================
 * run
 * Takes the request from the browser,
 * parses out user input,
 * creates the initial node & game state,
 * calls minimax algorithm
 ===================================================================*/

exports.run = function (req, res) {
    "use strict";
    var rootNode, input, initialState, i, j, lastMove;
    // read in inputs
    nodeFactory.reset();
    input = parseInput(req.body.input);
    // create initial state array
    initialState = new Array(input.numberOfPossibleMoves);
    for (i = 0; i < input.numberOfPossibleMoves; i++) {
        initialState[i] = new Array(input.numberOfPossibleMoves);
        for (j = 0; j < input.numberOfPossibleMoves; j++) {
            initialState[i][j] = false;
        }
    }
    // mark off previous used move combinations
    input.movesTaken.map(function (move) {
        initialState[move[0]][move[1]] = true;
        initialState[move[1]][move[0]] = true;
    });
    // create root node (Opponent's Last Move)
    // get final move from input
    lastMove = [input.movesTaken[input.movesTaken.length - 1][0],
                    input.movesTaken[input.movesTaken.length - 1][1]];
    rootNode = nodeFactory.createNode('root', lastMove);
    // initialize root node state
    rootNode.state = initialState;
    // add the root node and its state to the tree & state objects
    stateVariables.tree[rootNode.id] = rootNode;
    stateVariables.gameStates[JSON.stringify(rootNode.state)] = rootNode.id;

    // call minimax run, passing in the root node and the opponent's last move
    return search.minimax(rootNode);
};