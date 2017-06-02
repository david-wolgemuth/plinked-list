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

  runTest('#equal', () => {
    const listA = new List('a', 'b', 'c');
    const listB = new List('a', 'b', 'c');
    equal(listA.equal(listB), true, 'Equal lists');
    listB.append('1');
    equal(listA.equal(listB), false, 'Different lengths');
    listA.append(1);
    equal(listA.equal(listB), false, 'Default Compare with ===');
    equal(listA.equal(listB, (a, b) => (a==b)), true, 'Custom Compare');
  });

  runTest('#copy', () => {
    const list = new List('a', 'b', 'c');
    const copy = list.copy();
    equal(list.equal(copy), true);
  });

  runTest('#concat', () => {
    const list = new List('a', 'b', 'c');
    const abcdef = list.concat(new List('d', 'e', 'f'));
    equal(abcdef.equal(new List('a', 'b', 'c', 'd', 'e', 'f')), true);
    equal(list.equal(new List('a', 'b', 'c', 'd', 'e', 'f')), false);
  });
  
  runTest('#each', () => {
    const out = new List();
    (new List('a', 'b', 'c')).each((char, index) => {
      out.append(char);
      out.append(index);
    });
    equal(out.equal(new List('a', 0, 'b', 1, 'c', 2)), true);
  });

  runTest('#reduce', () => {
    equal(new List(1, 2, 3).reduce((sum, num) => (sum + num)), 6);
    equal(new List(1, 2, 3).reduce((sum, num) => (sum + num), 2), 8);
  });

  runTest('#find', () => {
    equal(new List(1, 2, 3).find(x => x == '2'), 2);
    equal(new List(1, 2, 3).find(x => x == '0'), null);
  });

  runTest('#toArray', () => {
    const arr = new List('a', 'b', 'c').toArray();
    equal(arr.length, 3);
    equal(arr[0], 'a');
    equal(arr[1], 'b');
    equal(arr[2], 'c');
  });

  runTest('#toString', () => {
    const listA = new List('a', 'b', 'c');
    equal(listA.toString(), 'List("a", "b", "c")');
    const listB = new List(1, 2, 3);
    equal(listB.toString(), 'List(1, 2, 3)');
  });

  runTest('#join', () => {
    const list = new List('a', 'b', 'c');
    equal(list.join('_'), 'a_b_c');
    equal(list.join(), 'a,b,c');
  });

});
