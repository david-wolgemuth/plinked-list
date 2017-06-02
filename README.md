# Plinked List

List constructor.

### [View The Docs](https://david-wolgemuth.github.io/plinked-list/docs)

### Basic Usage

```javascript
const list = new List('b', 'c', 'd');
list.append('e');
list.prepend('a');

const letters = list.join();  // a,b,c,d,e

list.each((char, index) => {
  console.log(index, char);
});
```
