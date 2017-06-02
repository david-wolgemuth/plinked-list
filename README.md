# Plinked List

List constructor.

### [View The Docs](https://david-wolgemuth.github.io/plinked-list/docs/List_List.html)

### Basic Usage

```
npm install plinked-list
```

```javascript
const List = require('plinked-list');

const list = new List('b', 'c', 'd');
list.append('e');
list.prepend('a');

const letters = list.join();  // a,b,c,d,e

list.each((char, index) => {
  console.log(index, char);
});
```
