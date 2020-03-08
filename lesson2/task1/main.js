const math = require('@olgax/math');

math.min([10, 0, -3, 6, 2, -1]);
math.min([]);
math.min('string');
math.min();

math.sum(10, 0, -3, 6, 2, -1);
math.sum([], null, 1, 'string', true, false, {}, 2);
math.sum();

math.abs('-1');
math.abs(-2);
math.abs(null);
math.abs('');
math.abs([]);
math.abs([2]);
math.abs([1,2]);
math.abs({});
math.abs('string');
math.abs();
