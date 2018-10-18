# @datastrucures-js/avl-tree

[![build:?](https://travis-ci.org/datastructures-js/avl-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/avl-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/avl-tree.svg)](https://www.npmjs.com/package/@datastructures-js/avl-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/avl-tree.svg)](https://www.npmjs.com/package/@datastructures-js/avl-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/avl-tree)

node's data type: **string**, **number**.

<img width="1387" alt="AVL Tree" src="https://user-images.githubusercontent.com/6517308/37691467-e9c7db8a-2c77-11e8-844a-c6b6c0ff93dd.png">

## Usage
```js
const avlTree = require('@datastructures-js/avl-tree');
const avl = avlTree();
```

## API

**.node(value, parent, left, right)**

creates a binary tree node with height property.

* **.setValue(value)** sets the node's value.
* **.getValue()** gets the node's value.
* **.setParent(parent)** sets the parent node.
* **.getParent()** gets the parent node.
* **.setLeft(left)** sets the node's left child.
* **.getLeft()** gets the node's left child.
* **.setRight(right)** sets the node's right child.
* **.getRight()** gets the node's right child.
* **.setHeight(height)** sets the node's height.
* **.getHeight()** gets the node's height.

```js
const n = avl.node('test');
console.log(n.getValue()); // test
console.log(n.getParent()); // null
console.log(n.getLeft()); // null
console.log(n.getRight()); // null
console.log(n.getHeight()); // 1
```

**.insert(value)** 

inserts a value into the tree and maintains the tree balance by rotating the imbalanced node.
```javascript
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(60);
avl.insert(70);
avl.insert(80);
```

**.root()** 

gets the root node
```javascript
console.log(avl.root().getValue()); // 50
```

**.min()** 

finds the min value node (most left).
```javascript
console.log(avl.min().getValue()); // 20
```

**.max()** 

finds the min value node (most right).
```javascript
console.log(avl.max().getValue()); // 80
```

**.count()** 

gets nodes count.
```javascript
console.log(avl.count()); // 7
```

**.find(value)** 

finds the value's node or returns null if not found.
```javascript
let n = avl.find(30);
console.log(n.getValue()); // 30
console.log(n.getRight().getValue()); // 40
console.log(n.getLeft().getValue()); // 20
console.log(n.getHeight()); // 2
```

**.traverseInOrder(cb)** 
```js
// in-order traverse (left-parent-right)
avl.traverseInOrder(node => console.log(node.getValue()));

// 20
// 30
// 40
// 50
// 60
// 70
// 80
```

**.traversePreOrder(cb)** 

```js
// pre-order traverse (parent-left-right)
avl.traversePreOrder(node => console.log(node.getValue()));

// 50
// 30
// 20
// 40
// 70
// 60
// 80
```

**.traversePostOrder(cb)** 

```js
// post-order traverse (left-right-parent)
avl.traverse(node => console.log(node.getValue()));

// 20
// 40
// 30
// 60
// 80
// 70
// 50
```

**.traverse(cb, order)** 

traverse the tree in the defined order and apply a callback on each node.

order values: `inOrder`, `preOrder` OR `postOrder`. default is `inOrder`

```js
avl.traverse(node => console.log(node.getValue())); // in-order

// 20
// 30
// 40
// 50
// 60
// 70
// 80

avl.traverse(node => console.log(node.getValue()), 'preOrder');

// 50
// 30
// 20
// 40
// 70
// 60
// 80
```


**.remove(value)** 

removes a value's node (if exists) from the tree and maintains the tree balance by rotating the imbalanced node.
```javascript
console.log(bst.find(30).getValue()); // 30
bst.remove(30);
console.log(bst.find(30)); // null
```

**.clear()** 

clears the tree.
```javascript
avl.clear();
console.log(avl.count()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/avl-tree/blob/master/LICENSE)
