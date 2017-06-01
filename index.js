
class List
{
  /**
   * Create instance of List
   * @memberof List#
   */
  constructor ()
  {
    /**
     * Head node
     * @type {ListNode}
     * @private
     */
    this._head = null;
    /**
     * Tail node
     * @type {ListNode}
     * @private
     */
    this._tail = null;
    this.extend(Array.prototype.slice.call(arguments));
  }
  /**
   * Append value to list
   * @param {any} value Value to append to list
   * @return {List} Instance of list for chaining
   * @memberof List#
   */
  append (value)
  {
    const backNode = new ListNode(value);
    if (!this._head) {
      this._head = backNode;
      this._tail = backNode;
    } else {
      backNode.prev = this._tail;
      this._tail.next = backNode;
      this._tail = backNode;
    }
    return this;
  }
  /**
   * Prepend value to list
   * @param {any} value Value to prepend to list
   * @return {List} Instance of list for chaining
   * @memberof List#
   */
  prepend (value)
  {
    const newNode = new ListNode(value, this._head);
    if (!this._head) {
      this._tail = newNode;
    } else {
      this._head.prev = newNode;
    }
    this._head = newNode;
    return this;
  }
  /**
   * Remove last element from list
   * @return {any} Removed element
   * @memberof List#
   */
  pop ()
  {
    if (!this._tail) {
      return null;
    }
    const value = this._tail.value;
    this._tail = this._tail.prev;
    if (!this._tail) {
      // List is now empty
      this._head = null;
    } else {
      this._tail.next = null;
    }
    return value;
  }
  /**
   * Remove first element from list
   * @return {any} Removed element
   * @memberof List#
   */
  shift ()
  {
    if (!this._head) {
      return null;
    }
    const value = this._head.value;
    this._head = this._head.next;
    if (!this._head) {
      this._tail = null;
    } else {
      // List is now empty
      this._head.prev = null;
    }
    return value;
  }
  /**
   * Create copy of the list instance
   * @return {List} new copy of list
   * @memberof List#
   */
  copy ()
  {
    const copy = new List();
    this.each(value => copy.append(value));
    return copy;
  }
  /**
   * Concat list with second list
   * @param {List} list second list to concat
   * @return {List} new list combining values of previous lists
   * @memberof List#
   */
  concat (list)
  {
    const newList = this.copy();
    list.each(value => newList.append(value));
    return newList;
  }
  /**
   * Extend list with all values of array or list
   * @param {List|Array} list values to add to list
   * @return {List} instance of list for chaining
   * @memberof List#
   */
  extend (list)
  {
    if (list instanceof Array) {
      list.forEach(value => this.append(value));
    } else if (list instanceof List) {
      list.each(value => this.append(value));
    }
    return this;
  }
  /**
   * EachCallback
   * @callback eachCallback
   * @param {any} value element of list
   * @param {int} index index of element in list
   * @return {Boolean} return false to end loop
   */
  /**
   * Run callback on each element of List
   * @param {eachCallback} callback
   * @return {List} instance of list for chaining
   * @memberof List#
   */
  each (callback)
  {
    this._eachNode((node, index) => callback(node.value, index));
    return this;
  }
  /**
   * ReduceCallback
   * @callback reduceCallback
   * @param {any} acc accumulated value
   * @param {any} value element of list
   * @param {int} index index of element in list
   * @return {any} new accumulated value
   */
  /**
   * Reduct List to single value
   * @param {reduceCallback} callback 
   * @param {any} init initial value for accumulation
   * @returns {any} accumulated value
   * @memberof List#
   */
  reduce (callback, init)
  {
    return this._reduceNodes((acc, node, index) => callback(acc, node.value, index), init);
  }
  /**
   * FindCallback
   * @callback findCallback
   * @param {any} value value of list
   * @return {Boolean} return truthy if found
   */
  /**
   * Find element
   * @param {findCallback} callback 
   * @return {any} found element
   * @memberof List#
   */
  find (callback)
  {
    let found = null;
    this.each((value) => {
      if (callback(value)) {
        found = value;
        return false;
      }
    });
    return found;
  }
  /**
   * Get first element in list
   * @return {any} first element in list
   * @memberof List#
   */
  first ()
  {
    return (this._head) ? this._head.value : null;
  }
  /**
   * Get last element in list
   * @return {any} last element in list
   * @memberof List#
   */
  last ()
  {
    return (this._tail) ? this._tail.value : null;
  }
  /**
   * Create array from List
   * @returns {Array} elements of list in array
   * @memberof List#
   */
  toArray ()
  {
    const array = [];
    this.each(value => { array.push(value); });
    return array;
  }
  /**
   * Create string from List
   * @param {string} [separator=", "] value to separate elements
   * @return {string} string representation of list
   * @memberof List#
   */
  toString (separator=", ")
  {
    return this._reduceNodes((string, node) => 
      (node === this._tail) 
        ? string + JSON.stringify(node.value)
        : string + JSON.stringify(node.value) + separator
    , 'List(') + ')';
  }
  /**
   * ReduceNodesCallback
   * @callback reduceNodesCallback
   * @param {any} acc accumulated value of nodes
   * @param {ListNode} node current node of list
   * @param {int} index index of node
   * @return {any} new accumulated value of nodes
   */
  /**
   * Reduce all nodes to single value
   * @param {reduceNodesCallback} callback 
   * @param {any} init initial value of accumulation
   * @returns {any} accumulated value of nodex
   * @private
   * @memberof List#
   */
  _reduceNodes (callback, init)
  {
    let acc = (init === undefined) ? this.first() : init;
    this._eachNode((node, index) => {
      acc = callback(acc, node, index);
    });
    return acc;
  }
  /**
   * EachNodeCallback
   * @callback eachNodeCallback
   * @param {ListNode} node current node of list
   * @param {int} index index of current node
   * @return {Boolean} return false to terminate loop
   * @memberof List#
   */
  /**
   * @param {eachNodeCallback} callback 
   * @return {List} instance of list for chaining
   * @private
   * @memberof List#
   */
  _eachNode (callback)
  {
    let index = 0;
    for (let runner = this._head; runner; runner = runner.next) {
      if (callback(runner, index) === false) {
        return;
      }
      index += 1;
    }
    return this;
  }
  /**
   * FindNodeCallback
   * @callback findNodeCallback
   * @param {node} node current node of list
   * @return {Boolean} return truthy if found
   */
  /**
   * Find node
   * @param {findNodeCallback} callback 
   * @return {ListNode} found node
   * @private
   * @memberof List#
   */
  _findNode (callback)
  {
    if (typeof(callback) !== "function") {
      return;
    }
    for (let runner = this._head; runner; runner = runner.next) {
      if (callback(runner)) {
        return runner;
      }
    }
    return null;
  }
}

class ListNode
{
  /**
   * Create instance of ListNode
   * @param {any} value node's value
   * @param {ListNode} [next=null] next node
   * @param {ListNode} [prev=null] previous node
   * @memberof ListNode#
   */
  constructor (value, next=null, prev=null)
  {
    this.value = value;
    this.next  = next;
    this.prev  = prev;
  }
}

module.exports = List;
