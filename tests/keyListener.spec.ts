import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('keyListener', () => {
  describe('getKeyListener', () => {
    singleTest(swissnode.getKeyListener, 'getKeyListener', (getKeyListener, name) => {
      it(should` exist as ${name}`, () => {
        expect(getKeyListener).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });
});
