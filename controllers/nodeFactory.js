/**
 * Created by Mike on 1/30/2015.
 */
var id;
var tree = {};

var getNextId = function () {
    "use strict";
    return id++;
};

var deepCopy = function (inputArray) {
    "use strict";
    var length, newArray, i, j;
    newArray = [];
    length = inputArray.length;
    for (i = 0; i < length; i++) {
        newArray.push(inputArray[i].slice());
    }
    return newArray;
};

exports.createNode = function (parentNode, move) {
    "use strict";
    var newNode, depth, parent, state;
    depth = parentNode === 'root' ? 0 : parentNode.depth + 1;
    parent = parentNode === 'root' ? 'root' : parentNode.id;
    state = parentNode === 'root' ? [] : deepCopy(parentNode.state);
    if (parentNode !== 'root') {
        state[move[0]][move[1]] = true;
        state[move[1]][move[0]] = true;
    }
    newNode = {
        id: getNextId(),
        nextMove: move,
        depth: depth,
        parent: parent,
        children: [],
        score: 0,
        state: state
    };
    tree[newNode.id] = newNode;
    return newNode;
};

exports.isMinNode = function (node) {
    "use strict";
    return node.depth % 2 !== 0;
};

exports.isMaxNode = function (node) {
    "use strict";
    return node.depth % 2 === 0;
};

exports.isLeaf = function (node) {
    "use strict";
    return node.children.length === 0;
};

exports.reset = function () {
    id = 0;
    tree = {};
};

exports.createGameTrace = function (leafNodeId) {
    var currentNode, gameSteps;
    gameSteps = [];
    currentNode = tree[leafNodeId];
    while (currentNode.parent !== 'root') {
        gameSteps.push(currentNode.nextMove);
        currentNode = tree[currentNode.parent];
    }
    return gameSteps.reverse();
};
