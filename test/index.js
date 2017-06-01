const assert = require('assert');
const { runTest, runAllTests, equal } = require('./tester');
const List = require('..');

runAllTests('List', () => {

  runTest('#constructor', () => {
    const list = new List();
    assert(list, 'List Initialized');
  });

  runTest('#append', () => {
    const list = new List();
    list.append('x');
    equal(list.first(),'x', 'First Element is first appended');
    equal(list.last(),'x', 'Last Element is last appended');
    list.append('y');
    equal(list.first(),'x', 'First Element is first appended');
    equal(list.last(),'y', 'Last Element is last appended');
  });

  runTest('#prepend', () => {
    const list = new List();
    list.prepend('x');
    equal(list.first(),'x', 'First Element is last prepended');
    equal(list.last(),'x', 'Last Element is first prepended');
    list.prepend('y');
    equal(list.first(),'y', 'First Element is last prepended');
    equal(list.last(),'x', 'Last Element is first prepended');
  });

  runTest('#extend', () => {
    const list = new List('a', 'b', 'c');
    equal(list._head.value, 'a');
    equal(list._head.next.value, 'b');
    equal(list._head.next.next.value, 'c');
    equal(list.first(), 'a');
    equal(list.last(), 'c');
  });

  runTest('#pop', () => {
    const list = new List('a', 'b', 'c');
    equal(list.pop(), 'c');
    equal(list.pop(), 'b');
    equal(list.first(), 'a');
    equal(list.last(), 'a');
    equal(list.pop(), 'a');
    equal(list.pop(), null);
    equal(list.first(), null);
    equal(list.last(), null);
  });

  runTest('#shift', () => {
    const list = new List('a', 'b', 'c');
    equal(list.shift(), 'a');
    equal(list.shift(), 'b');
    equal(list.first(), 'c');
    equal(list.last(), 'c');
    equal(list.shift(), 'c');
    equal(list.shift(), null);
    equal(list.first(), null);
    equal(list.last(), null);
  });

  runTest('#copy', () => {
    const list = new List('a', 'b', 'c');
    const copy = list.copy();
    equal(list.first(), copy.first());
    equal(list.last(), copy.last());
    equal(list._head.next.value, copy._head.next.value);
  });

  runTest('#concat', () => {

  });

});
