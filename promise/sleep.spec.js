import { trimEnd } from 'lodash';
import { sleep } from './sleep';

test('sleep', async () => {
  // expect.assertions(1);

  // 方法一
  // return sleep(1000).then((value) => {
  //   expect(value).toBe('sleep 1000');
  // });
  // 方法二
  // return expect(sleep(1000)).resolves.toBe('sleep 1000');
  // 方法三

  console.time('sleep');
  // sleep(500).then(() => {
  //   console.timeEnd('sleep');
  // });
  await sleep(500);
  console.timeEnd('sleep');
  
  const callback = jest.fn();
  setTimeout(callback, 1000);
  await sleep(1000);
  expect(callback).toBeCalledTimes(1);
});
