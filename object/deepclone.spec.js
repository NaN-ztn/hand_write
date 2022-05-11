import { deepClone } from './deepClone.js';

test('deep clone', () => {
  let person = {
    name: 'apple',
    age: 22,
    friends: ['zs', 'ls', 'wu'],
  };
  // 对深拷贝的对象应用类型属性进行修改不会影响原对象
  let clonePerson = deepClone(person);
  clonePerson.name = 'orange';
  clonePerson.age = 18;
  clonePerson.friends[0] = '张三';

  expect(person).toEqual({
    name: 'apple',
    age: 22,
    friends: ['zs', 'ls', 'wu'],
  });
});
