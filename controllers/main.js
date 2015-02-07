/**
 * Created by Mike on 1/30/2015.
 */
var nodeFactory = require('./nodeFactory');
var danceGame = require('./danceGame');
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
 * createInitialState
 * Takes the total number of moves and the moves already taken and
 * returns a 2D array of booleans with the already used moves marked
 * as true while the rest of the array elements are false.
 ===================================================================*/
var createInitialState = function (numberOfPossibleMoves, movesTaken) {
    "use strict";
    var initialState, i, j;
    initialState = new Array(numberOfPossibleMoves);
    for (i = 0; i < numberOfPossibleMoves; i++) {
        initialState[i] = new Array(numberOfPossibleMoves);
        for (j = 0; j < numberOfPossibleMoves; j++) {
            initialState[i][j] = false;
        }
    }
    // mark off previous used move combinations
    movesTaken.map(function (move) {
        initialState[move[0]][move[1]] = true;
        initialState[move[1]][move[0]] = true;
    });
    return initialState;
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
    var rootNode, input, initialState, lastMove;
    // Reset the node factory fields in case this is not the first run.
    nodeFactory.reset();
    input = parseInput(req.body.input);
    // create initial state array
    initialState = createInitialState(input.numberOfPossibleMoves, input.movesTaken);
    // get final move from input
    lastMove = [
        input.movesTaken[input.movesTaken.length - 1][0],
        input.movesTaken[input.movesTaken.length - 1][1]
    ];
    // Create root node
    rootNode = nodeFactory.createNode('root', lastMove);
    // initialize root node state
    rootNode.state = initialState;
    // call minimax run, passing in the root node and the moves provided in the input
    res = search.searchHelper(rootNode, input.movesTaken);
    return res;
};






