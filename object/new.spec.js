import { objectFactory } from './new.js';

test('new test', () => {
  // example
  function Person(name) {
    this.name = name;
  }
  let zhangsan = objectFactory(Person, 'zhangsan');
  expect(zhangsan).toEqual({ name: 'zhangsan' });
});
