/**
 * Created by Mike on 1/30/2015.
 */
var id;

var getNextId = function () {
    "use strict";
    if (id === undefined) {
        id = 0;
        return id;
    }
    return ++id;
};

exports.createNode = function (parentNode, move) {
    "use strict";
    var newNode, depth, parent, state;
    depth = parentNode === 'root' ? 0 : parentNode.depth + 1;
    parent = parentNode === 'root' ? 'root' : parentNode.id;
    state = parentNode === 'root' ? [] : parentNode.state;
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

