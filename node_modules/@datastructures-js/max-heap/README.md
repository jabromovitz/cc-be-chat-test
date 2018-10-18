# @datastrucures-js/max-heap

[![build:?](https://travis-ci.org/datastructures-js/max-heap.svg?branch=master)](https://travis-ci.org/datastructures-js/max-heap) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/max-heap.svg)](https://www.npmjs.com/package/@datastructures-js/max-heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/max-heap.svg)](https://www.npmjs.com/package/@datastructures-js/max-heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/max-heap)

elements data type: **number**, **string**.

<img width="420" alt="Max Heap" src="https://user-images.githubusercontent.com/6517308/36940962-844a7fe8-1f15-11e8-8165-6fd62ba1914f.png">

## Usage
```js
const maxHeapFn = require('@datastructures-js/max-heap');
const maxHeap = maxHeapFn();
```

## API

**.insert(value)** 

inserts a value into the heap.
```javascript
maxHeap.insert(50);
maxHeap.insert(80);
maxHeap.insert(30);
maxHeap.insert(90);
maxHeap.insert(60);
maxHeap.insert(40);
maxHeap.insert(20);
```

**.size()** 

retrieves the size of the heap
```javascript
console.log(maxHeap.size()); // 7
```

**.max()** 

peeks on the max value in the heap
```javascript
console.log(maxHeap.max()); // 90
```

**.extractMax()** 

retrieves and remove the max value from the heap
```javascript
console.log(maxHeap.extractMax()); // 90
console.log(maxHeap.max()); // 80
```

**.clear()** 

clears the heap
```javascript
maxHeap.clear();
console.log(maxHeap.size()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/max-heap/blob/master/LICENSE)
