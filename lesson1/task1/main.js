const min = require('./min');
const sum = require('./sum');
const abs = require('./abs');

min([10, 0, -3, 6, 2, -1]);
min([]);
min('string');
min();

sum(10, 0, -3, 6, 2, -1);
sum([], null, 1, 'string', true, false, {}, 2);
sum();

abs('-1');
abs(-2);
abs(null);
abs('');
abs([]);
abs([2]);
abs([1,2]);
abs({});
abs('string');
abs();