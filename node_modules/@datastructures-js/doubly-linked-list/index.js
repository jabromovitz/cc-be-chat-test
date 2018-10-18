/**
 * datastructures-js/doubly-linked-list
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * Doubly Linked List Node
 * @function
 */
const node = (val, pre, nex) => {
  let value = val;
  let prev = pre;
  let next = nex;

  /**
   * @param {string|number} v
   */
  const setValue = (v) => {
    value = v;
  };

  /**
   * @return {string|number}
   */
  const getValue = () => value;

  /**
   * @param {object} - node
   */
  const setNext = (n) => {
    next = n;
  };

  /**
   * @return {object} - node
   */
  const getNext = () => next || null;

  /**
   * @param {object} - node
   */
  const setPrev = (n) => {
    prev = n;
  };

  /**
   * @return {object} - node
   */
  const getPrev = () => prev || null;

  return {
    setValue,
    getValue,
    setPrev,
    getPrev,
    setNext,
    getNext
  };
};

/**
 * Doubly Linked List
 * @function
 */
const doublyLinkedList = () => {
  let headNode = null;
  let tailNode = null;
  let nodesCount = 0;

  /**
   * @returns {object} - node
   */
  const head = () => headNode;

  /**
   * @returns {object} - node
   */
  const tail = () => tailNode;

  /**
   * @returns {number}
   */
  const count = () => nodesCount;

  /**
   * @param {string|number} value
   * @returns {object} - node
   */
  const find = (value) => {
    let current = headNode;
    while (current !== null) {
      if (current.getValue() === value) {
        return current;
      }
      current = current.getNext();
    }
    return current;
  };

  /**
   * @param {string|number} value
   */
  const addFirst = (value) => {
    if (headNode === null) {
      headNode = node(value);
      tailNode = headNode;
    } else {
      const n = node(value, null, headNode);
      headNode.setPrev(n);
      headNode = n;
    }
    nodesCount += 1;
  };

  /**
   * @param {string|number} value
   */
  const addLast = (value) => {
    if (headNode === null) {
      headNode = node(value);
      tailNode = headNode;
    } else {
      const n = node(value, tailNode, null);
      tailNode.setNext(n);
      tailNode = n;
    }
    nodesCount += 1;
  };

  /**
   * adds a new node after an existing node
   * @param {string|number} value
   * @param {string|number} newValue
   * @throws {Error}
   */
  const addAfter = (value, newValue) => {
    let current = headNode;
    while (current !== null) {
      if (current.getValue() === value) {
        if (current.getNext() === null) {
          addLast(newValue);
        } else {
          const n = node(newValue, current, current.getNext());
          current.getNext().setPrev(n);
          current.setNext(n);
          nodesCount += 1;
        }
        break;
      } else {
        current = current.getNext();
      }
    }
    if (current === null) {
      throw new Error(`node ${value} not found`);
    }
  };

  /**
   * @public
   * adds a new node before an existing node
   * @param {(string|number)} value
   * @param {(string|number)} newValue
   * @throws {Error}
   */
  const addBefore = (value, newValue) => {
    let current = tailNode;
    while (current !== null) {
      if (current.getValue() === value) {
        if (current.getPrev() === null) {
          addFirst(newValue);
        } else {
          const n = node(newValue, current.getPrev(), current);
          current.getPrev().setNext(n);
          current.setPrev(n);
          nodesCount += 1;
        }
        break;
      } else {
        current = current.getPrev();
      }
    }
    if (current === null) {
      throw new Error(`node ${value} not found`);
    }
  };

  /**
   * removes the first node
   */
  const removeFirst = () => {
    if (headNode !== null) {
      if (headNode.getNext() === null) {
        headNode = null;
        tailNode = null;
      } else {
        headNode = headNode.getNext();
        headNode.setPrev(null);
      }
      nodesCount -= 1;
    }
  };

  /**
   * removes the last node
   */
  const removeLast = () => {
    if (tailNode !== null) {
      if (tailNode.getPrev() === null) {
        headNode = null;
        tailNode = null;
      } else {
        tailNode = tailNode.getPrev();
        tailNode.setNext(null);
      }
      nodesCount -= 1;
    }
  };

  /**
   * removes a node by its value
   * @param {(string|number)} value
   */
  const remove = (value) => {
    let current = headNode;
    while (current !== null) {
      if (current.getValue() === value) {
        if (current.getPrev() === null) {
          removeFirst();
        } else {
          current.getPrev().setNext(current.getNext());
          current.getNext().setPrev(current.getPrev());
          nodesCount -= 1;
        }
        break;
      } else {
        current = current.getNext();
      }
    }
  };

  /**
   * traverse the doublyLinkedlist from a beginning to end
   * @param {function} cb - called with node in the linked list
   */
  const traverse = (cb) => {
    let current = headNode;
    while (current !== null) {
      cb(current);
      current = current.getNext();
    }
  };

  /**
   * traverse the doublyLinkedList from the end to start
   * @param {function} cb
   */
  const traverseBackward = (cb) => {
    let current = tailNode;
    while (current !== null) {
      cb(current);
      current = current.getPrev();
    }
  };

  /**
   * @returns {array}
   */
  const toArray = () => {
    const arr = [];
    traverse(n => arr.push(n.getValue()));
    return arr;
  };

  /**
   * clears the linked list
   */
  const clear = () => {
    headNode = null;
    tailNode = null;
    nodesCount = 0;
  };

  // doublyLinkedList API
  return {
    node,
    head,
    tail,
    count,
    find,
    addFirst,
    addLast,
    addBefore,
    addAfter,
    remove,
    removeFirst,
    removeLast,
    traverse,
    traverseBackward,
    toArray,
    clear
  };
};

module.exports = doublyLinkedList;
