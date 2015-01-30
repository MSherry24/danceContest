/**
 * Created by Mike on 1/30/2015.
 */
exports.createNode = function (parentNode) {
    var newNode, depth, parent;
    depth = parentNode === 'root' ? 0 : parentNode.depth + 1;
    parent = parentNode === 'root' ? 'root' : JSON.stringify(parentNode);
    newNode = {
        depth: depth,
        parent: parent,
        children: [],
        score: 0,
        state: []
    };
    return newNode;
};

exports.isMinNode = function (node) {
    "use strict";
    return node.score % 2 !== 0;
};

exports.isMaxNode = function (node) {
    "use strict";
    return node.score % 2 === 0;
};

exports.isLeaf = function (node) {
    "use strict";
    return node.children.length === 0;
};