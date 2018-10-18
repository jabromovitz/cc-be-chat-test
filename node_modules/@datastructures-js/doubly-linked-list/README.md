# @datastrucures-js/doubly-linked-list

[![build:?](https://travis-ci.org/datastructures-js/doubly-linked-list.svg?branch=master)](https://travis-ci.org/datastructures-js/doubly-linked-list) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/doubly-linked-list.svg)](https://www.npmjs.com/package/@datastructures-js/doubly-linked-list)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/doubly-linked-list.svg)](https://www.npmjs.com/package/@datastructures-js/doubly-linked-list) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/doubly-linked-list)

node's data type: **number**, **string**, **boolean**, **null**, **undefined**.

<img width="552" alt="dll" src="https://user-images.githubusercontent.com/6517308/35762752-19b17df4-0862-11e8-8ce3-f940d83dde51.png">

## Usage
```js
const doublyLinkedListFn = require('@datastructures-js/doubly-linked-list');
const dll = doublyLinkedListFn();
```

## API

**.node(value)**

creates a linked list node with a given value. The node object exposes the following functions:

* **.setValue(value)** sets the value of the node.
* **.getValue()** gets the value of the node
* **.setNext(node)** sets the next linkedListNode object.
* **.getNext()** gets the next linkedListNode object.
* **.setPrev(node)** sets the previous linkedListNode object.
* **.getPrev()** gets the previous linkedListNode object.

```javascript
const n = dll.node('new_node');
console.log(n.getValue()); // new_node
console.log(n.getNext()); // null
console.log(n.getPrev()); // null
```

**.addFirst(value)** 

adds a node of the given value at the beginning of the list.
```javascript
dll.addFirst('n1');
```

**.addLast(value)** 

adds a node of the given value at the end of the list.
```javascript
dll.addLast('n4');
```

**.addAfter(value, newValue)** 

adds a node with a given value after an existing value's node.
```javascript
try {
  dll.addAfter('n1', 'n2');
  dll.addAfter('n33', 'n3');
}
catch (e) {
  console.log(e.message); // node n33 not found
}
```

**.addBefore(value, newValue)** 

adds a node with a given value before an existing value's node.
```javascript
try {
  dll.addBefore('n4', 'n3');
  dll.addBefore('n33', 'n3');
}
catch (e) {
  console.log(e.message); // node n33 not found
}
```

**.find(value)** 
finds a node by its value and returns a linked list node object.

```javascript
const n3 = dll.find('n3');
console.log(n3.getValue()); // n3
console.log(n3.getNext().getValue()); // n4
```

**.head()** 

returns the first dll node object in the list.
```javascript
const head = dll.head();
console.log(head.getValue()); // n1
```

**.tail()** 

returns the first dll node object in the list.
```javascript
const tail = dll.tail();
console.log(head.getValue()); // n1
```

**.traverse(cb)** 

traverse the dll from beginning to end and calls cb for each node
```javascript
dll.traverse((n) => { console.log(n.getValue()); });
// n1
// n2
// n3
// n4
```

**.traverseBackward(cb)** 

traverse the dll from end to beginning and calls cb for each node
```javascript
dll.traverseBackward((n) => { console.log(n.getValue()); });
// n4
// n3
// n2
// n1
```

**.remove(value)** 

remove the value's node - if exists - from the list.
```javascript
dll.remove('n3');
```

**.removeFirst()** 

removes the first node in the list.
```javascript
dll.removeFirst(); // n1 removed
```

**.removeLast()** 

removes the last node in the list.
```javascript
dll.removeLast(); // n4 removed
```

**.toArray()** 

converts the dll to an array
```javascript
console.log(dll.toArray());
// ['n1', 'n2', 'n3', 'n4']
```

**.count()** 

returns nodes' count in the list.
```javascript
console.log(dll.count()); // 1
```

**.clear()** 

removes all nodes from the list.
```javascript
dll.clear();
console.log(dll.head()); // null
console.log(dll.count()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/doubly-linked-list/blob/master/LICENSE)
