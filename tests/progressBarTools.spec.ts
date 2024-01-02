import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('progressBarTools', () => {
  describe('print', () => {
    singleTest(
      swissnode.progressBarTools.getColouredProgressBarOpts,
      'progressBarTools.getColouredProgressBarOpts',
      (getColouredProgressBarOpts, name) => {
        it(should` exist as ${name}`, () => {
          expect(getColouredProgressBarOpts).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });
});
