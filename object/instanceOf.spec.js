import { extend } from 'lodash';
import { instanceOf } from './instanceOf';

test('instance of', () => {
  function People() {}
  let p1 = new People();

  expect(instanceOf(p1, People)).toBeTruthy();
});
