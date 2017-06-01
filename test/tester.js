const assert = require('assert');

const runAllTests = (class_name, tests) => {
  try {
    tests();
    console.log('\n\n >Tests Passed');
  } catch (error) {
    console.log('\n', class_name + error);
  }
};

const runTest = (message, test) => {
  if (typeof(test) !== 'function') {
    return pending();
  }
  try {
    test();
    success();
  } catch (error) {
    fail();
    throw message + "\n\t" + error.message;
  }
};

const equal = (x, y, message) => {
  assert(x===y, `(${JSON.stringify(x)}===${JSON.stringify(y)}) ${message||''}`);
};

const success = () => {
  process.stdout.write('.');
};

const fail = () => {
  process.stdout.write('x');
};

const pending = () => {
  process.stdout.write('_');
}

module.exports = { runTest, runAllTests, equal };

