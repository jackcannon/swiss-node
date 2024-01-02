import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('waiters', () => {
  describe('nextTick', () => {
    multiTest(
      [
        [swissnode.nextTick, 'nextTick'],
        [swissnode.waiters.nextTick, 'waiters.nextTick']
      ],
      (nextTick, name) => {
        it(should` exist as ${name}`, () => {
          expect(nextTick).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });
});
