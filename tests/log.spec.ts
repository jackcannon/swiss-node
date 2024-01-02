import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('log', () => {
  describe('log', () => {
    singleTest(swissnode.log, 'log', (log, name) => {
      it(should` exist as ${name}`, () => {
        expect(log).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });
  describe('createLogger', () => {
    singleTest(swissnode.createLogger, 'createLogger', (createLogger, name) => {
      it(should` exist as ${name}`, () => {
        expect(createLogger).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });
});
