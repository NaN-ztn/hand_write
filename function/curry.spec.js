import { curry, _curry } from './curry';

test('curry test', () => {
  function add(a, b, c, d, e) {
    return a + b + c + d + e;
  }

  let curryAdd = curry(add, [1, 2]);
  let res = curryAdd(3, 5)(6);

  let _curryAdd = _curry(add, [1, 2]);
  let _res = _curryAdd(3, 5)(6);

  expect(res).toBe(17);
  expect(_res).toBe(17);
});
